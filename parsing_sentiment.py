import os
import sys
import pandas as pd
import nltk
import json

import csv
import string
string.punctuation

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.sentiment import SentimentIntensityAnalyzer


from bs4 import BeautifulSoup
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')
nltk.download('vader_lexicon')

from bs4 import BeautifulSoup


sia = SentimentIntensityAnalyzer()

col_list = ['parsed']

df = pd.read_csv("data/outputs.csv", usecols=col_list)
sentiment_score = []
obj = {'title': "", 'parsed': '', 'sentiment_score': ''}
for colName, item in df.items():
	for i in range(len(item)):
		print(sia.polarity_scores(item[i]))
		sentiment_score.append(sia.polarity_scores(item[i]))
	

f = open("data/sentiment_score.json", "w")
f.write(json.dumps(sentiment_score))
f.close()
# sia.polarity_scores()