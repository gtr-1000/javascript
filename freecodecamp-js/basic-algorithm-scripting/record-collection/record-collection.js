const recordCollection = {
  2548: {
    albumTitle: 'Slippery When Wet',
    artist: 'Bon Jovi',
    tracks: ['Let It Rock', 'You Give Love a Bad Name']
  },
  2468: {
    albumTitle: '1999',
    artist: 'Prince',
    tracks: ['1999', 'Little Red Corvette']
  },
  1245: {
    artist: 'Robert Palmer',
    tracks: []
  },
  5439: {
    albumTitle: 'ABBA Gold'
  }
};


function updateRecordsTurbinado(records, id, prop, value) {
  if (value === "") {
    delete records[id][prop];
  } 
  else if (prop !== "tracks") {
    records[id][prop] = value;
  } 
  else {
    // 1. Ensures that the 'tracks' property always exists as an array
    if (!records[id].hasOwnProperty("tracks")) {
      records[id]["tracks"] = [];
    }
    
    // 2. If 'value' is an Array, we use 'concat' to merge the two lists
    if (Array.isArray(value)) {
      records[id]["tracks"] = records[id]["tracks"].concat(value);
    } 
    // 3. If it is just a string (a single track), we use a regular push
    else {
      records[id]["tracks"].push(value);
    }
  }

  return records;
}
