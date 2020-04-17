-- ## OSRM profile file

-- The profile file is used to define speeds and routability for OSRM. It is
-- possible to define speeds conditionally based on way tags and other attributes.

-- The profile used for this project is pretty simple and straightforward.
-- The road network only contains roads that we need to account for, not having
-- one ways, traffic lights, private roads, etc. All roads are considered routable
-- depending on the condition and surface.


-- Additional information about `.lua` profiles:
-- - https://www.winwaed.com/blog/2015/11/18/osrms-lua-scripts/
-- - https://github.com/Project-OSRM/osrm-backend/wiki/Profiles
-- - https://github.com/Project-OSRM/osrm-backend/blob/master/docs/profiles.md

-- NOTE:
-- For some reason osrm-customize was breaking
-- The process won't error but just print:

-- $ docker run -t -v "${PWD}:/data" osrm/osrm-backend osrm-customize /data/road-network.osrm
-- [info] Loaded edge based graph: 434864 edges, 105748 nodes
-- [info] Loading partition data took 0.240434 seconds

-- Turns out it was the value of weight_precision. If it is to high, osrm is
-- not able to store it.

api_version = 4

-- Define the properties and configuration.
function setup ()
  return {
    properties = {
      -- Increase accuracy of routing.
      max_speed_for_map_matching      = 180/3.6, -- kmph -> m/s
      weight_name                     = 'duration',
      weight_precision                = 1
    },

    speeds_type = {
      RN = 100,
      RD = 90,
      RC = 80,
      RA = 70,
      RU = 60,
      RI = 50
    },

    penalties_seasonality = {
      ["all-weather"] = 0,
      ["dry-weather"] = 20
      -- "non-passable" = BLOCK 
    },

    penalties_width = {
      large = 0,
      medium = 10,
      small = 20
    },

    penalties_surface = {
      ["asphalt"] = 0,
      ["stabilized-soil"] = 20,
      ["earth"] = 40
    }
  }
end

function process_node (profile, node, result)
  -- The road network is very simple. Nothing to do on nodes.
end

function process_way (profile, way, result)
  -- Check if it is not passable.
  -- local seasonality = way:get_value_by_key('seasonality')
  if seasonality == 'non-passable' then
    return
  end

  -- Use the way id tag as its name
  local name = way:get_value_by_key('id')
  -- Set the name that will be used for instructions
  if name then
    result.name = name
  end

  result.forward_mode = mode.driving
  result.backward_mode = mode.driving

  local waySpeed = nil

  -- -- Type
  local type = way:get_value_by_key('type')
  local typeSpeed = profile.speeds_type[type]

  if not typeSpeed then
    waySpeed = profile.speeds_type.RI
  else
    waySpeed = typeSpeed
  end

  -- -- Seasonality
  local seasonalityPen = profile.penalties_seasonality[seasonality]

  if seasonalityPen or seasonalityPen == 0 then
    waySpeed = waySpeed - seasonalityPen
  else
    waySpeed = waySpeed - profile.penalties_seasonality["dry-weather"]
  end

  -- -- Surface
  local surface = way:get_value_by_key('surface')
  local surfacePen = profile.penalties_surface[surface]

  if surfacePen or surfacePen == 0 then
    waySpeed = waySpeed - surfacePen
  else
    waySpeed = waySpeed - profile.penalties_surface.earth
  end

  -- -- Width
  local width = way:get_value_by_key('width')
  local widthPen = profile.penalties_width[width]

  if widthPen or widthPen == 0 then
    waySpeed = waySpeed - widthPen
  else
    waySpeed = waySpeed - profile.penalties_width.small
  end

  waySpeed = math.max(waySpeed, 10)

  result.forward_speed = waySpeed
  result.backward_speed = waySpeed

  result.forward_rate = waySpeed / 3.6
  result.backward_rate = waySpeed / 3.6
end

function process_turn (profile, turn)
  -- There are no turn restrictions to process.
end

return {
  setup = setup,
  process_way = process_way,
  process_node = process_node,
  process_turn = process_turn
}
