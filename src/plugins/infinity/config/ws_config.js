serverconfig = {
    // you have access to the discord js client class in here
    // 

    "port": 3000,
    "routes": {
        "index": {
            "type": "STATIC",
            "file": "bar"
        },
        "test": {
            "type": "DYNAMIC",
            "file": "testfile",
            "vars": {
                "title": "Hello - World",
                "sometest": "This is the first test variable I defined, to define more, simply add them here",
                "somethingelse": "Some other varibale to show you its working."
            }
        },
        "foo": {
            "type": "STATIC",
            "file": "bar"
        } 
    }
}

module.exports = serverconfig;