"""Methods for scraping Bulbapedia for pokémon egg group data"""

import re
import json
import requests
import pandas as pd
from bs4 import BeautifulSoup
from inflection import underscore

def scrape_egg_groups():
    """Scrapes the Egg_Group Bulbapedia page to get links to all egg group pages"""
    base_url = 'https://bulbapedia.bulbagarden.net'
    url = base_url + '/wiki/Egg_Group'
    page = requests.get(url, timeout=5)
    soup = BeautifulSoup(page.content, 'html.parser')

    egg_groups_heading = soup.find(id="Egg_Groups").find_parent('h2')

    # Find the list of links to other egg group pages on Bulbapedia
    egg_links = egg_groups_heading.find_next_sibling('ol')\
    .find_all('a', href=re.compile(r"\(Egg_Group\)$"))

    egg_links_href_list = []
    for egg_link in egg_links:
        egg_links_href_list.append(base_url + egg_link['href'])

    return egg_links_href_list

def get_data_frame_by_id(soup, html_id):
    """Gets a data frame from a table by id"""
    try:
        table = soup.find(id=html_id).find_parent('h3').find_next_sibling('table').find('table')
        return pd.read_html(str(table))[0]
    except AttributeError:
        return None

def sanitize_pkmn_string(s):
    """Removes the '♀' and '♂' characters from a pokemon string"""
    return s.replace('♀', '_f').replace('♂', '_m').replace(' ', '_')


def add_pkmn_to_egg_group_dict(pkmn_by_egg_group_dict, data_frame, egg_group_key):
    """Adds a pokemon to the egg group dictionary"""
    egg_group_dict = pkmn_by_egg_group_dict[egg_group_key]
    for _, row in data_frame.iterrows():
        pkmn_name_key = sanitize_pkmn_string(underscore(row['Pokémon']))
        egg_group_list = [egg_group_key]
        # If the pokemon has multiple egg groups, add the other one to the list
        try:
            egg_group_list.append(underscore(row['Other']))
        except KeyError:
            pass
        egg_group_dict[pkmn_name_key] =\
        {'name': row['Pokémon'],\
        'egg_groups': egg_group_list}


def generate_egg_group_json_from_bulbapedia():
    """Scrapes a list of pokemon from each egg group"""

    egg_group_urls = scrape_egg_groups()

    pkmn_by_egg_group = {}

    for egg_group_url in egg_group_urls:
        egg_group_name = re.search(r'wiki\/(.*)_\(Egg_Group\)$', egg_group_url).group(1)
        egg_group_key = sanitize_pkmn_string(underscore(egg_group_name))
        pkmn_by_egg_group[egg_group_key] = {}

        page = requests.get(egg_group_url, timeout=5)
        soup = BeautifulSoup(page.content, 'html.parser')

        only_this_df = get_data_frame_by_id(soup, 'Only_in_this_Egg_Group')
        if only_this_df is not None:
            add_pkmn_to_egg_group_dict(pkmn_by_egg_group, only_this_df, egg_group_key)

        multiple_df = get_data_frame_by_id(soup, 'In_this_and_another_Egg_Group')
        if multiple_df is not None:
            add_pkmn_to_egg_group_dict(pkmn_by_egg_group, multiple_df, egg_group_key)

        with(open('egg_groups.json', 'w', encoding="utf-8")) as egg_groups_file:
            json.dump(pkmn_by_egg_group, egg_groups_file, indent=4)

generate_egg_group_json_from_bulbapedia()
