import os
import sys
import pandas as pd
import nltk
import json
import numpy as np
import csv
import string




def freq(str, num):
	# break the string into list of words
	str_list = str.split()
  
	# gives set of unique words
	unique_words = set(str_list)
	obj = {'word': "", 'frequency': 0}
	processedWords = []
	processedFreqData = []
	for words in unique_words:
		processedWords.append(words)
		processedFreqData.append(str_list.count(words))
	
	retArray = np.array((processedWords,processedFreqData)).T
	return retArray

col_list = ['parsed']
words_for_each_tale = [];
df = pd.read_csv('data/outputs.csv', usecols=col_list)

for colName, item in df.items():
	
	for i in range(len(item)):
	# for i in range(1):
		# freq(item[i],i)
		
		df = pd.DataFrame(data = freq(item[i],i))

		df.to_csv('data/tale{}.csv'.format(i))
		print('data/tale{}.csv'.format(i))


# for item in df['parsed']:
# 	words_for_each_tale.append(item)

# df = pd.DataFrame(data = processedData)
# df.to_csv('data/output_str.csv')
# sia.polarity_scores()