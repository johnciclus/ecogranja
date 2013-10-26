# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121101161518) do

  create_table "articles", :force => true do |t|
    t.string   "title",       :null => false
    t.text     "content",     :null => false
    t.integer  "category_id", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "categories", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "description", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "coordinates", :force => true do |t|
    t.integer  "ind",        :null => false
    t.float    "lat",        :null => false
    t.float    "lng",        :null => false
    t.float    "alt",        :null => false
    t.integer  "farm_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "crops", :force => true do |t|
    t.string   "name",             :null => false
    t.string   "description",      :null => false
    t.float    "NabsorPro",        :null => false
    t.float    "PAbsorPro",        :null => false
    t.float    "KAbsorPro",        :null => false
    t.float    "NExtraPro",        :null => false
    t.float    "PExtraPro",        :null => false
    t.float    "KExtraPro",        :null => false
    t.float    "ProPhPlantas",     :null => false
    t.float    "DesPhPlantas",     :null => false
    t.float    "PesoUniCultivo",   :null => false
    t.float    "DesPesoUniCul",    :null => false
    t.float    "PesoUniCosecha",   :null => false
    t.float    "DesPesoUniCos",    :null => false
    t.float    "TiemVegetativo",   :null => false
    t.float    "TiemReproductivo", :null => false
    t.float    "ProLumiPlanta",    :null => false
    t.float    "DesLumiPlanta",    :null => false
    t.float    "ProPreciPlanta",   :null => false
    t.float    "DesPreciPlanta",   :null => false
    t.float    "ProHumePlanta",    :null => false
    t.float    "DesHumePlanta",    :null => false
    t.float    "ProTempPlanta",    :null => false
    t.float    "DesTempPlanta",    :null => false
    t.integer  "article_id",       :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "environments", :force => true do |t|
    t.string   "name",             :null => false
    t.float    "Nitrogeno",        :null => false
    t.float    "Fosforo",          :null => false
    t.float    "Potasio",          :null => false
    t.float    "PhSuelo",          :null => false
    t.float    "DensidadAparente", :null => false
    t.float    "Profundidad",      :null => false
    t.integer  "farm_id",          :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "farms", :force => true do |t|
    t.string   "name",       :null => false
    t.string   "owner",      :null => false
    t.string   "address",    :null => false
    t.string   "city",       :null => false
    t.string   "state",      :null => false
    t.string   "country",    :null => false
    t.float    "loc_lat",    :null => false
    t.float    "loc_lng",    :null => false
    t.float    "loc_alt",    :null => false
    t.float    "area",       :null => false
    t.float    "avg_slope",  :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "productions", :force => true do |t|
    t.string   "name",           :null => false
    t.float    "AreaCultivo",    :null => false
    t.float    "DistHorizontal", :null => false
    t.float    "DistVertical",   :null => false
    t.integer  "farm_id",        :null => false
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "profiles", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "permissions", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "scenarios", :force => true do |t|
    t.string   "name",                :null => false
    t.string   "description",         :null => false
    t.integer  "environment_id",      :null => false
    t.integer  "crop_id",             :null => false
    t.integer  "production_id",       :null => false
    t.integer  "soil_improvement_id", :null => false
    t.integer  "farm_id",             :null => false
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  create_table "soil_improvements", :force => true do |t|
    t.string   "name",             :null => false
    t.string   "DiasApliCal",      :null => false
    t.string   "DiasApliFer",      :null => false
    t.string   "CompFertilizante", :null => false
    t.integer  "farm_id",          :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "username",           :null => false
    t.string   "name",               :null => false
    t.string   "encrypted_password", :null => false
    t.string   "salt",               :null => false
    t.string   "email",              :null => false
    t.string   "occupation",         :null => false
    t.string   "organization",       :null => false
    t.string   "city",               :null => false
    t.string   "state",              :null => false
    t.string   "country",            :null => false
    t.integer  "profile_id",         :null => false
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

end
