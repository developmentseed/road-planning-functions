-- Car profile

api_version = 4

Set = require('lib/set')
Sequence = require('lib/sequence')
Handlers = require("lib/way_handlers")
Relations = require("lib/relations")
limit = require("lib/maxspeed").limit
Utils = require("lib/utils")
Measure = require("lib/measure")

function setup()
  return {
    properties = {
      max_speed_for_map_matching      = 180/3.6, -- 180kmph -> m/s
      -- For routing based on duration, but weighted for preferring certain roads
      weight_name                     = 'routability',
      -- For shortest duration without penalties for accessibility
      -- weight_name                     = 'duration',
      -- For shortest distance without penalties for accessibility
      -- weight_name                     = 'distance',
      process_call_tagless_node      = false,
      u_turn_penalty                 = 20,
      continue_straight_at_waypoint  = true
    },

    default_mode              = mode.driving,
    default_speed             = 10,
    side_road_multiplier      = 0.8,
    turn_penalty              = 7.5,
    speed_reduction           = 0.8,
    turn_bias                 = 1.075,

    speeds = Sequence {
      type = {
        RI              = 90,
        RN              = 65,
        RD              = 55,
        RC              = 30,
        RA              = 25,
        RU              = 20
      }
    },

    service_penalties = {
    },

    restricted_highway_whitelist = Set {
    },

    construction_whitelist = Set {
    },

    route_speeds = {
    },

    bridge_speeds = {
    },

    access_tags_hierarchy = Sequence {
    },

    -- surface/trackype/smoothness
    -- values were estimated from looking at the photos at the relevant wiki pages

    -- max speed for surfaces
    surface_speeds = {
      asphalt = nil,    -- nil mean no limit. removing the line has the same effect
      concrete = nil,
      ["concrete:plates"] = nil,
      ["concrete:lanes"] = nil,
      paved = nil,

      cement = 80,
      compacted = 80,
      fine_gravel = 80,

      paving_stones = 60,
      metal = 60,
      bricks = 60,

      grass = 40,
      wood = 40,
      sett = 40,
      grass_paver = 40,
      gravel = 40,
      unpaved = 40,
      ground = 40,
      dirt = 40,
      pebblestone = 40,
      tartan = 40,

      cobblestone = 30,
      clay = 30,

      earth = 20,
      stone = 20,
      rocky = 20,
      sand = 20,

      mud = 10
    },

    -- max speed for tracktypes
    tracktype_speeds = {
      grade1 =  60,
      grade2 =  40,
      grade3 =  30,
      grade4 =  25,
      grade5 =  20
    },

    -- max speed for smoothnesses
    smoothness_speeds = {
      intermediate    =  80,
      bad             =  40,
      very_bad        =  20,
      horrible        =  10,
      very_horrible   =  5,
      impassable      =  0
    },

    -- http://wiki.openstreetmap.org/wiki/Speed_limits
    maxspeed_table_default = {
      urban = 50,
      rural = 90,
      trunk = 110,
      motorway = 130
    },

    relation_types = Sequence {
    },

    -- classify highway tags when necessary for turn weights
    highway_turn_classification = {
    },

    -- classify access tags when necessary for turn weights
    access_turn_classification = {
    }
  }
end

function process_node(profile, node, result, relations)
  -- The road network is very simple. Nothing to do on nodes.
end

function process_way(profile, way, result, relations)
  -- the intial filtering of ways based on presence of tags
  -- affects processing times significantly, because all ways
  -- have to be checked.
  -- to increase performance, prefetching and intial tag check
  -- is done in directly instead of via a handler.

  -- in general we should  try to abort as soon as
  -- possible if the way is not routable, to avoid doing
  -- unnecessary work. this implies we should check things that
  -- commonly forbids access early, and handle edge cases later.

  -- data table for storing intermediate values during processing
  local data = {
    -- prefetch tags
    type = way:get_value_by_key('type'),
    bridge = way:get_value_by_key('bridge')
  }

  -- perform an quick initial check and abort if the way is
  -- obviously not routable.
  -- type tags must be in data table, bridge is optional
  if (not data.type)
  then
    return
  end

  handlers = Sequence {
    -- set the default mode for this profile. if can be changed later
    -- in case it turns we're e.g. on a ferry
    WayHandlers.default_mode,

    -- compute speed taking into account way type, maxspeed tags, etc.
    WayHandlers.speed,
    WayHandlers.surface,
    WayHandlers.maxspeed,
    WayHandlers.penalties,

    -- compute class labels
    WayHandlers.classes,
  }

  WayHandlers.run(profile, way, result, data, handlers, relations)

end

function process_turn(profile, turn)
  -- The road network is very simple. Nothing to do on turns.
end

return {
  setup = setup,
  process_way = process_way,
  process_node = process_node
}