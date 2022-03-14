## Memory:
## Global:
- constructionSites: all construction sites (id)
- rooms: all available rooms (roomname)
- allSpawns: all my spawns (id)
### Creeps:
- target: target the creeps wants to go/ do something with. (id)

## Room:
- name: name of room (string)
- sources: all energy sources in the room (id)
- droppedEnergy: all dropped energy  in the room(id)
- otherEnergy: energy in the room in tombstones or ruins (id)
- energyContainers: all containers with energy stored in the room (id)
- allContainers: all containers in the room (id)
- storage: storage in the room (id) or null if missing
- energyStorage: storage with energy stored in the room (id) or null if missing
- damagedStructures: all damaged structures in the room (ids)
- allSpawns: all spawns in this room
- mainPaths: paths from all spawns to all sources and the controller in the room (serialized Path (string))
- constructionSites: all my construction sites in the room (id)
- roadConstructionSites: all road construction sites in the room (id)
