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
        "id": "text724990059",
        "max": 0,
        "min": 0,
        "name": "title",
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
        "id": "number405181692",
        "max": null,
        "min": null,
        "name": "cost",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
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
        "help": "",
        "hidden": false,
        "id": "date2862495610",
        "max": "",
        "min": "",
        "name": "date",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "help": "",
        "hidden": false,
        "id": "bool3430122276",
        "name": "isBanquet",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
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
    "id": "books0000000000",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "name": "books",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "viewRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("books0000000000");

  return app.delete(collection);
})
