/*
 Navicat Premium Data Transfer

 Source Server         : api-doc.db
 Source Server Type    : SQLite
 Source Server Version : 3030001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3030001
 File Encoding         : 65001

 Date: 23/02/2021 12:30:30
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS "project";
CREATE TABLE "project" (
  "pid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "project_name" TEXT,
  "description" TEXT
);

-- ----------------------------
-- Table structure for project_catalog
-- ----------------------------
DROP TABLE IF EXISTS "project_catalog";
CREATE TABLE "project_catalog" (
  "pcid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "catalog_name" TEXT,
  "parentId" INTEGER,
  "pid" INTEGER
);

-- ----------------------------
-- Table structure for project_item
-- ----------------------------
DROP TABLE IF EXISTS "project_item";
CREATE TABLE "project_item" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT,
  "context" TEXT,
  "pid" INTEGER,
  "pcid" INTEGER
);

-- ----------------------------
-- Table structure for team
-- ----------------------------
DROP TABLE IF EXISTS "team";
CREATE TABLE "team" (
  "tid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "team_name" TEXT,
  "team_desc" TEXT
);

-- ----------------------------
-- Table structure for team_mamber
-- ----------------------------
DROP TABLE IF EXISTS "team_mamber";
CREATE TABLE "team_mamber" (
  "tmid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "tid" INTEGER,
  "uid" INTEGER,
  "trid" INTEGER
);

-- ----------------------------
-- Table structure for team_role
-- ----------------------------
DROP TABLE IF EXISTS "team_role";
CREATE TABLE "team_role" (
  "trid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "role" TEXT
);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "uid" TEXT NOT NULL,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "nick_name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "create_time" TEXT NOT NULL,
  "update_time" TEXT,
  "last_login_time" TEXT,
  PRIMARY KEY ("uid")
);

-- ----------------------------
-- Table structure for user_project
-- ----------------------------
DROP TABLE IF EXISTS "user_project";
CREATE TABLE "user_project" (
  "upid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" INTEGER,
  "pid" INTEGER
);

-- ----------------------------
-- Auto increment value for project
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 2 WHERE name = 'project';

-- ----------------------------
-- Auto increment value for project_catalog
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'project_catalog';

-- ----------------------------
-- Auto increment value for project_item
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 1 WHERE name = 'project_item';

-- ----------------------------
-- Auto increment value for team
-- ----------------------------

-- ----------------------------
-- Auto increment value for team_mamber
-- ----------------------------

-- ----------------------------
-- Auto increment value for team_role
-- ----------------------------

PRAGMA foreign_keys = true;
