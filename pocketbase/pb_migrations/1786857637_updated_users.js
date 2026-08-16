/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId",
    "oauth2": {
      "mappedFields": {
        "name": ""
      }
    },
    "updateRule": "@request.auth.id = id",
    "viewRule": "@request.auth.id != \"\" && familyId = @request.auth.familyId"
  }, collection)

  // remove field
  collection.fields.removeById("text1579384326")

  // remove field
  collection.fields.removeById("file376926767")

  // remove field
  collection.fields.removeById("autodate2990389176")

  // remove field
  collection.fields.removeById("autodate3332085495")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text28987738",
    "max": 0,
    "min": 0,
    "name": "nickName",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text376926767",
    "max": 0,
    "min": 0,
    "name": "avatar",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1067152085",
    "max": 100,
    "min": 1,
    "name": "familyId",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text2084602413",
    "max": 0,
    "min": 0,
    "name": "familyRole",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "help": "",
    "hidden": false,
    "id": "number561821875",
    "max": 9,
    "min": 0,
    "name": "accountType",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "id = @request.auth.id",
    "listRule": "id = @request.auth.id",
    "oauth2": {
      "mappedFields": {
        "name": "name"
      }
    },
    "updateRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id"
  }, collection)

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 255,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "help": "",
    "hidden": false,
    "id": "file376926767",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
      "image/webp"
    ],
    "name": "avatar",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "autodate2990389176",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "autodate3332085495",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("text28987738")

  // remove field
  collection.fields.removeById("text376926767")

  // remove field
  collection.fields.removeById("text1067152085")

  // remove field
  collection.fields.removeById("text2084602413")

  // remove field
  collection.fields.removeById("number561821875")

  return app.save(collection)
})
