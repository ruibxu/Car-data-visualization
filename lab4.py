import os
import numpy as np
import pandas as pd
from sklearn.datasets import load_digits
from sklearn.manifold import MDS
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans

top200_movies_file = os.path.join('Car_sales.csv')


x=pd.read_csv(top200_movies_file)
corr_matrix=x.corr()

corr_matrix = corr_matrix.stack().reset_index()
corr_matrix.columns = ['v1','v2','correlation']
corr_matrix['correlation']=corr_matrix['correlation'].round(2)
#print(corr_matrix)
corr_matrix.to_csv('corr_matrix.csv')

#pca
allVar = ["Sales_in_thousands","year_resale_value","Engine_size","Horsepower","Wheelbase","Curb_weight","Fuel_capacity","Fuel_efficiency"]
data = StandardScaler().fit_transform(x[allVar])
pca = PCA(n_components=2)
#print(data)
solution = pca.fit_transform(data)
solution = pd.DataFrame(data = solution, columns = ['PC1', 'PC2'])
solution.to_csv('pca.csv',index=False)

#scree
pca = PCA(n_components=8)
r = pca.fit_transform(data)
r = pd.DataFrame(data = r, columns = ['1', '2','3', '4','5', '6','7', '8'])
r= pd.DataFrame(pca.explained_variance_ratio_*100).round(2)
r.to_csv('scree.csv')



#MDS1
#d = MinMaxScaler().fit_transform(x[allVar])
mds = MDS(2,random_state=0)
print(x[allVar])
mds = mds.fit_transform(x[allVar])
mds = pd.DataFrame(data = mds, columns = ['MDS1', 'MDS2'])
mds.to_csv('mds1.csv',index=False)

#MDS2
corr2=x.corr()
corr2=1-corr2.abs()
mds2 = MDS(2,random_state=0,dissimilarity='precomputed')
mds2 = mds2.fit_transform(corr2)
mds2 = pd.DataFrame(data = mds2, columns = ['MDS1', 'MDS2'])
mds2.to_csv('mds2.csv',index=False)


pd.DataFrame(np.transpose(pca.components_[0:2, :])).to_csv("biplot.csv")

df = pd.DataFrame(x)
df = df.loc[:, allVar].values
kM = KMeans(n_clusters=3)
kM.fit(df)
df = kM.predict(df)
pd.DataFrame(df).to_csv("k_mean.csv")