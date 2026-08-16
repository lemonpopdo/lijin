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
    "id": "friendtags00000",
    "indexes": [],
    "listRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "name": "friendTags",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "viewRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("friendtags00000");

  return app.delete(collection);
})
