Replication

mongod --dbpath db1 --port 27001 --replSet CourseWorkReplSet --fork --logpath db1/db1.log mongod --dbpath db2 --port 27002 --replSet CourseWorkReplSet --fork --logpath db2/db2.log mongod --dbpath db3 --port 27003 --replSet CourseWorkReplSet --fork --logpath db3/db3.log

mongo --port 27001

rs.initiate()

rs.add("localhost:27002") rs.add("localhost:27003")

rs.status()
