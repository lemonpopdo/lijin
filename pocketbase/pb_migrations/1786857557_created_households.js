/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "deleteRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text1579384326",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "help": "",
        "hidden": false,
        "id": "select105650625",
        "maxSelect": 1,
        "name": "category",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "直系",
          "亲戚",
          "朋友",
          "同事",
          "同学",
          "邻里",
          "其他"
        ]
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text223244161",
        "max": 0,
        "min": 0,
        "name": "address",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text2479400042",
        "max": 0,
        "min": 0,
        "name": "hometown",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text1156222427",
        "max": 0,
        "min": 0,
        "name": "remarks",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "help": "",
        "hidden": false,
        "id": "text1067152085",
        "max": 0,
        "min": 0,
        "name": "familyId",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      }
    ],
    "id": "households00001",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "name": "households",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "viewRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("households00001");

  return app.delete(collection);
})
