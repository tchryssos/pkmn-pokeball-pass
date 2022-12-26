"""Methods for scraping Bulbapedia for pokémon egg group data"""

import re
import requests
import pandas as pd
from bs4 import BeautifulSoup

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

def scrape_pokemon_from_egg_groups():
    """Scrapes a list of pokemon from each egg group"""

    egg_group_urls = scrape_egg_groups()

    page = requests.get(egg_group_urls[0], timeout=5)
    soup = BeautifulSoup(page.content, 'html.parser')
    only_this_egg_group = soup.find(id="Only_in_this_Egg_Group").find_parent('h3').find_next_sibling('table').find('table')
    df = pd.read_html(str(only_this_egg_group))
    print(df.head())

    # for egg_group_url in egg_group_urls:
    #     page = requests.get(egg_group_url, timeout=5)
    #     soup = BeautifulSoup(page.content, 'html.parser')

scrape_pokemon_from_egg_groups()
