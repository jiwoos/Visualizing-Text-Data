import os
import sys
import pandas as pd

import csv
import string

from bs4 import BeautifulSoup

url = 'englishfairytales/englishfairytales.html'

with open('englishfairytales/englishfairytales.html') as f:

    content = f.read()
    soup = BeautifulSoup(content, 'html.parser')
    
    h2s = soup.find_all("h2"); #titles of short stories

    for h2 in h2s:
        print(h2.text, h2.next_sibling)


    ps = soup.find_all("p")


    processedData = []
    for p in ps:
        p = p.text.lower().replace("<br />", " ").replace("\n", " ").replace('“', ' ').replace('”', ' ').translate(str.maketrans("", "", string.punctuation)).split(" ")
     
        p = list(filter(lambda x: x, p))

        print(p)
        for p1 in p:
            if len(p1) > 2:
                processedData.append(p1)


df = pd.DataFrame(data = processedData)
df.to_csv('data/output_str.csv')