Sharding

Setup Shard 1

cd ./shard1
mongod --shardsvr --dbpath shard1a --port 27001 --replSet Shard1CourseWorkReplSet --fork --logpath `shard1a/shard1a.log mongod --shardsvr --dbpath shard1b --port 27002 --replSet Shard1CourseWorkReplSet --fork --logpath shard1b/shard1b.log mongod --shardsvr --dbpath shard1c --port 27003 --replSet Shard1CourseWorkReplSet --fork --logpath shard1c/shard1c.log

mongo -port 27001

rs.initiate() rs.conf()

rs.add("localhost:27002") rs.add("localhost:27003")

Setup Shard 2

cd ../shard2
mongod --shardsvr --dbpath shard2a --port 27004 --replSet Shard2CourseWorkReplSet --fork --logpath shard2a/shard2a.log mongod --shardsvr --dbpath shard2b --port 27005 --replSet Shard2CourseWorkReplSet --fork --logpath shard2b/shard2b.log mongod --shardsvr --dbpath shard2c --port 27006 --replSet Shard2CourseWorkReplSet --fork --logpath shard2c/shard2c.log

mongo -port 27004

rs.initiate() rs.conf()

rs.add("localhost:27005") rs.add("localhost:27006")

Config Server Setup

cd ../configsvr
mongod --configsvr --replSet configserver --port 27007 --dbpath configsvr1 --fork --logpath configsvr1/configsvr1.log mongod --configsvr --replSet configserver --port 27008 --dbpath configsvr2 --fork --logpath configsvr2/configsvr2.log mongod --configsvr --replSet configserver --port 27009 --dbpath configsvr3 --fork --logpath configsvr3/configsvr3.log

mongo -port 27007

rs.initiate({"_id" : "configserver", configsvr: true, version: 1, members : [ {"_id" : 0, host : "localhost:27007"}, {"_id" : 1, host : "localhost:27008"}, {"_id" : 2, host : "localhost:27009"} ] })

Config Setup

cd ../routerdb
mongos --port 27010 --configdb configserver/localhost:27007,localhost:27008,localhost:27009 --fork --logpath routerdb/routerdb.log

mongo -port 27010

sh.addShard("Shard1CourseWorkReplSet/localhost:27001") sh.addShard("Shard1CourseWorkReplSet/localhost:27002") sh.addShard("Shard1CourseWorkReplSet/localhost:27003")

sh.addShard("Shard2CourseWorkReplSet/localhost:27004") sh.addShard("Shard2CourseWorkReplSet/localhost:27005") sh.addShard("Shard2CourseWorkReplSet/localhost:27006")

sh.enableSharding("test")

db = db.getSiblingDB('test') db.test.ensureIndex( { _id : "hashed" } ) sh.shardCollection( "test.movies", { "_id" : "hashed" } )
