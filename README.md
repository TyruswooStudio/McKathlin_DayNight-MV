# McKathlin Day-Night Cycle for RPG Maker MV

Add a day-night cycle!

This plugin keeps track of time of day as the cycle advances, auto-updates variables and switches based on time of day, and applies screen tones to areas marked as outdoors.

You can also add a variety of lighting presets to your maps.

And if you feel daring, turn on and customize the optional Bloodmoon feature.

## How to Start Using This Plugin

To start seeing results from this plugin, follow these steps:
1. As with any plugin, place it in the plugins folder and add it to your
   plugin list.
2. Edit plugin parameters to assign any switches and variables you plan on
   using in your events. For example, you can use the Night switch to make
   events that only show up at night.
3. For any maps that should advance the day-night cycle when the player
   walks, add this to the map's Note: `<DayNight: step>`

Now all maps' lighting changes based on time of day.

Here's how you can customize each map's lighting conditions:
* Open this plugin's parameters to Simple Lighting Presets, and look over
   your options. For instance, "Bright" makes a map bright as day at all
   times; "Fire" gives the map a subdued warm light; "Dark" is dim lighting
   good for caves, etc. Configure your own presets here if you want.
* To assign a lighting preset to a specific map, right click the map, and
   choose Edit. In the Note box, type a lighting notetag with the name
   of the preset to use map-wide. For example: `<lighting: Fire>`
   See the Map Notetag Examples section below for more info.
* Also, you can change which lighting preset applies to all maps that
   don't have their own lighting notetag. Change the plugin parameter
   Default Lighting Keyword to the name of the lighting preset you want.
   This is useful if most of your maps are indoor or dungeon maps.
   Then for the few maps that are outside, add the map notetag
   `<lighting: Outside>`

Here's how to make events change depending on the time of day:
1. This plugin's parameters include Daytime Switch and Night Switch.
   Set these to switch IDs that will automatically be updated when the
   time of day changes between day and night.
2. If you plan on having your game check the exact day, hour, or minute
   of day-night cycle time passed, set their variables in the plugin
   parameters as well. This is optional.
3. To make an event that only shows up at night, set the event page's
   conditions to include your game's Night Switch. For an event that only
   shows up in the daytime, make its event page conditions include the Day
   Switch.
4. To make an event change the time of day, have it use a plugin command
   such as Add Time or Set Time. For example, an inn might use Set Time to
   pass the night and make it morning. See the Plugin Command Examples
   section for more info.

Optionally, you can set up a cycle where some nights have different
lighting and a different switch active from most nights. We call this
Bloodmoon, but in your game you can tie any meaning to it you want:
New Moon, Full Moon, Blue Moon, Eclipse, whatever you have in mind.
Here's how to set it up:
1. Set the plugin parameter Enable Bloodmoon to ON.
2. Use the plugin parameters to assign any Bloodmoon switches and variable
    you plan to have your game's events use.
3. Set the plugin parameters Days in Moon Cycle and Nights Before First
    Bloodmoon to set how often unusual nights happen and when they start.
4. Adjust the Bloodmoon dusk, night, and dawn tone phases to your liking.
    The default settings give these nights a dark red cast, but you can
    change this to whatever you like.

## Map Notetag Examples

`<DayNight: step>`
Each step while on this map advances the in-universe time by the
number of minutes given in the "Minutes Per Step" parameter.

`<DayNight: step=15m>`
Each step while on this map causes the in-universe time to advance by
the given number of minutes (in this case, 15).

`<Lighting: outside>`
The screen tone while in this map will vary depending on the time of day.

`<lighting: dark>`
While on this map, the "Dark" lighting preset's screen tone will be used,
unless overridden by an event. For more map lighting options, see the
"Simple Lighting Presets" parameter.

## Plugin Command Examples

`Set Time` 7:05 AM
* Sets the the time of day to the specified time.
* In-universe time passed only moves forward, so setting the time earlier
than the present time will advance in-universe time to the next day.

`Add Time 2h 30m`
* Moves the time of day forward 2 hours and 30 minutes.

`Reset Time`
* Changes the time back to game start time on day 0.

`Set Lighting Dark`
* Applies the lighting preset named Dark for the rest of the player's time on this map.
* You may use the keyword of any one lighting preset you wish to apply.

`Reset Lighting`
* Resets the lighting conditions to the preset specified in the current map's notetag.

## Script Call Getter Methods
```                                        
McKathlin.DayNightCycle.getMinutes();
    // The number of minutes past the current hour: 0 through 59
McKathlin.DayNightCycle.getHours();
    // The hour of the current day: 0 (midnight) through 23 (11 PM)
McKathlin.DayNightCycle.getDays();
    // Number of full days since midnight of the starting day.
McKathlin.DayNightCycle.getTotalHours();
    // Number of hours since midnight of the starting day.
McKathlin.DayNightCycle.getTotalMinutes();
    // Number of minutes since midnight of the starting day.
McKathlin.DayNightCycle.getMinutesOfDay();
    // Number of minutes since midnight of the current day.
```

### Visit [**Tyruswoo.com**](https://www.tyruswoo.com) to [ask for help](https://www.tyruswoo.com/contact-us/), [donate](https://www.tyruswoo.com/donate/), or browse more of our [plugins](https://www.tyruswoo.com/downloads/rpg-maker-plugin-downloads/).

## Version History

**v2.1.0** - 8/30/2023
- Day-Night Cycle plugin released for RPG Maker MV
- Includes Bloodmoon and all other features from MZ Day-Night Cycle v2.1

> **Happy storytelling!**
> 
> *McKathlin*
