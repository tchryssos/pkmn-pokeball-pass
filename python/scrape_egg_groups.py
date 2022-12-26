"""Methods for scraping Bulbapedia for pokémon egg group data"""

import re
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

def get_data_frame_by_id(id):
    """Gets a data frame from a table by id"""
    table = soup.find(id=id).find_parent('h3').find_next_sibling('table').find('table')
    return pd.read_html(str(table))[0]


def add_pkmn_to_egg_group_dict(pkmn_by_egg_group_dict, data_frame, egg_group_key):
    """Adds a pokemon to the egg group dictionary"""
    egg_group_dict = pkmn_by_egg_group_dict[egg_group_key]
    for _, row in data_frame.iterrows():
        pkmn_name_key = underscore(row['Pokémon'])
        egg_group_dict[pkmn_name_key] =\
        {'name': row['Pokémon'],\
        'egg_groups': [egg_group_key, underscore(row['Other'])]}


def scrape_pokemon_from_egg_groups():
    """Scrapes a list of pokemon from each egg group"""

    egg_group_urls = scrape_egg_groups()

    pkmn_by_egg_group = {}

    egg_group_url = egg_group_urls[0]
    egg_group_name = re.search(r'wiki\/(.*)_\(Egg_Group\)$', egg_group_url).group(1)
    egg_group_key = underscore(egg_group_name)
    pkmn_by_egg_group[egg_group_key] = {}

    page = requests.get(egg_group_urls[0], timeout=5)
    soup = BeautifulSoup(page.content, 'html.parser')

    # START - ONLY THIS EGG GROUP - START
    only_this_df = get_data_frame_by_id('Only_in_this_Egg_Group')
    add_pkmn_to_egg_group_dict(pkmn_by_egg_group, only_this_df, egg_group_key)
    # END - ONLY THIS EGG GROUP - END

    # START - MULTIPLE EGG GROUPS - START
    multiple_df = get_data_frame_by_id('In_this_and_another_Egg_Group')
    add_pkmn_to_egg_group_dict(pkmn_by_egg_group, multiple_df, egg_group_key)
    # END - MULTIPLE EGG GROUPS - END

    print(pkmn_by_egg_group)

    # for egg_group_url in egg_group_urls:
    #     page = requests.get(egg_group_url, timeout=5)
    #     soup = BeautifulSoup(page.content, 'html.parser')

scrape_pokemon_from_egg_groups()
