"""Methods for scraping Bulbapedia for pokémon egg group data"""

import re
import requests
from bs4 import BeautifulSoup

def scrape_egg_groups():
    """Scrapes the Egg_Group Bulbapedia page to get links to all egg group pages"""
    base_url = 'https://bulbapedia.bulbagarden.net'
    url = base_url + '/wiki/Egg_Group'
    page = requests.get(url, timeout=5)
    soup = BeautifulSoup(page.content, 'html.parser')

    egg_groups_heading = soup.find(id="Egg_Groups").find_parent('h2')

    # Find the list of links to other egg group pages on Bulbapedia
    egg_links = egg_groups_heading.find_next_sibling('ol').find_all('a', href=re.compile(r"\(Egg_Group\)$"))

    egg_links_href_list = []
    for egg_link in egg_links:
        egg_links_href_list.append(base_url + egg_link['href'])

    return egg_links_href_list

scrape_egg_groups()

# def scrapePokemonFromEggGroups():
#     egg_links_href_list = scrape_egg_groups()
#     p = []

#     for eggLink in egg_links_href_list:
#         page = requests.get(eggLink)
#         soup = BeautifulSoup(page.content, 'html.parser')

#         # Find the list of links to pokemon on Bulbapedia
#         pokemonLinks = soup.find(id="Pokémon").find_parent('h2').find_next_sibling('ul').find_all('a', href=re.compile('\(Pokémon\)$'))

#         for pokemonLink in pokemonLinks:
#             pokemonList.append(pokemonLink.text)

#     return pokemonList
