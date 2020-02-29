# jsonb-cli
command line interface for manipulating jsonb-db

# Installation
```npm install jsonb-cli -g```


# Usage
Navigate to project folder and provide the followings commands
## Available commands

| command | description | example |
|:--------| :----------| :-------|
|  jsonb  | lunch jsonb-cli| > jsonb|
|  help    | print jsonb-cli usage help |> jsonb help
|  version    | print jsonb-cli version |> jsonb version
|  connect --db=databasename   | connect jsonb-cli to db |> jsonb connect --db=logs
|  db    | list functions for connected db instance |jsonb>db
|  collections()    | list avalaibale collections in connected db instance |jsonb>db.collections()|
|  createCollection("collectionName")    | create collection |jsonb>db.createCollection("customers")|
|  updateCollection("oldCollectionName","newCollectionName")    | rename collection |jsonb>db.updateCollection("customers","sample")|
|  dropCollection("collectionName")    | delete collection |jsonb>db.dropCollection("sample")|
|  collection()    | list avalable functions for each collections  |jsonb>db.collection()|
|  find(criteria)    | Find items in collection ,when criteria not provided all items are retrieved |jsonb>db.collection("sample").find({"country":"TZ"})|
|  skip(rows)    | Skip rows for a given output |jsonb>db.collection("sample").find({"country":"TZ"}).skip(1)|
|  take(rows)    | limit number of output rows |jsonb>db.collection("sample").find({"country":"TZ"}).take(1)|
|  count()    | count total number of rows |jsonb>db.collection("sample").find({"country":"TZ"}).count()|
|  query    | Format output to  readable json |jsonb>db.collection("sample").find({"country":"TZ"}).query|
|  pretty()    | Format output to  nice look json format  |jsonb>db.collection("sample").find({"country":"TZ"}).pretty()|
|  table()    | Display results in table  |jsonb>db.collection("sample").find({"country":"TZ"}).table()|
| insert(value)   | Insert one item(object) into a collection  |jsonb>db.collection("sample").insert({"country":"UK"})|
| insertMany(values)   | Insert many items into a collection  |jsonb>db.collection("sample").insertMany([{"country":"UK"},{"country":"KE"},{"country":"UG"}])|
| update(criteria,value)   | Update one items in a collection,where by criteria is searching object and value is the new item to be updated  |jsonb>db.collection("sample").update({"country":"UK"},{"country":"TZ"})|
| remove(criterai)   | delete item from a collection  |jsonb>db.collection("sample").remove({"country":"UK"})|
