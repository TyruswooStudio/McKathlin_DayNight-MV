//=============================================================================
// Day-Night Cycle
// For RPG Maker MV
// by McKathlin
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.McKathlin_DayNight = true;

var McKathlin = McKathlin || {};
McKathlin.DayNight = McKathlin.DayNight || {};

/*:
 * @plugindesc MV v0.1.0 Configure and track a day-night cycle.
 * @author McKathlin
 * @help Day-Night Cycle for RPG Maker MV
 * ============================================================================
 * This plugin tracks a day-night cycle:
 * it keeps track of time of day as the cycle advances,
 * auto-updates variables and switches based on time of day,
 * and applies screen tones to areas marked as outdoors.
 * ===========================================================================
 * How to Start Using This Plugin                                               
 * ===========================================================================
 * To start seeing results from this plugin, follow these steps:
 * 1. As with any plugin, place it in the plugins folder and add it to your
 *    plugin list. 
 * 2. Edit plugin parameters to assign any switches and variables you plan on
 *    using in your events. For example, you can use the Night switch to make
 *    events that only show up at night.
 * 3. For any maps that should advance the day-night cycle when the player
 *    walks, add this to the map's Note: <DayNight: step>
 * 
 * Now all maps' lighting changes based on time of day.
 * Here's how you can customize each map's lighting conditions:
 * 4. Open this plugin's parameters to Simple Lighting Presets, and look over
 *    your options. For instance, "Bright" makes a map bright as day at all
 *    times; "Fire" gives the map a subdued warm light; "Dark" is dim lighting
 *    good for caves, etc. Configure your own presets here if you want.
 * 5. To assign a lighting preset to a specific map, right click the map, and
 *    choose Edit. In the Note box, type a lighting notetag with the name
 *    of the preset to use map-wide. For example: <lighting: Fire>
 *    See the Map Notetag Examples section below for more info.
 * 6. Also, you can change which lighting preset applies to all maps that
 *    don't have their own lighting notetag. Change the plugin parameter
 *    Default Lighting Keyword to the name of the lighting preset you want.
 *    This is useful if most of your maps are indoor or dungeon maps.
 *    Then for the few maps that are outside, add the map notetag
 *    <lighting: Outside>
 * 
 * Here's how to make events change depending on the time of day:
 * 7. This plugin's parameters include Daytime Switch and Night Switch.
 *    Set these to switch IDs that will automatically be updated when the
 *    time of day changes between day and night.
 * 8. If you plan on having your game check the exact day, hour, or minute
 *    of day-night cycle time passed, set their variables in the plugin
 *    parameters as well. This is optional.
 * 9. To make an event that only shows up at night, set the event page's
 *    conditions to include your game's Night Switch. For an event that only
 *    shows up in the daytime, make its event page conditions include the Day
 *    Switch.
 * 10.To make an event change the time of day, have it use a plugin command
 *    such as Add Time or Set Time. For example, an inn might use Set Time to
 *    pass the night and make it morning. See the Plugin Command Examples
 *    section for more info.
 * 
 * ===========================================================================
 * Map Notetag Examples                                                   
 * ===========================================================================
 * <DayNight: step>
 *   Each step while on this map advances the in-universe time by the
 *   number of minutes given in the "Minutes Per Step" parameter.
 * 
 * <DayNight: step=15m>
 *   Each step while on this map causes the in-universe time to advance by
 *   the given number of minutes (in this case, 15).
 *
 * <Lighting: outside>
 *   The screen tone while in this map will vary depending on the time of day.
 *
 * <lighting: dark>
 *   While on this map, the "Dark" lighting preset's screen tone will be used,
 *   unless overridden by an event. For more map lighting options, see the
 *   "Simple Lighting Presets" parameter.
 * 
 * ===========================================================================
 * Plugin Command Examples                                               
 * ===========================================================================
 * DayNight set 7:05 AM
 *   Sets the the time of day to the specified time.
 *   In-universe time passed only moves forward, so setting the time earlier
 *   than the present time will advance in-universe time to the next day.
 *
 * DayNight add 2hs 30m
 *   Moves the time of day forward the specified amount.
 *
 * DayNight reset
 *   Changes the time back to game start time on day 0.
 *
 * ===========================================================================
 * Script Call Getter Methods                                             
 * ===========================================================================
 * McKathlin.DayNightCycle.getMinutes();
 *     // The number of minutes past the current hour: 0 through 59
 * McKathlin.DayNightCycle.getHours();
 *     // The hour of the current day: 0 (midnight) through 23 (11 PM)
 * McKathlin.DayNightCycle.getDays();
 *     // Number of full days since midnight of the starting day.
 * McKathlin.DayNightCycle.getTotalHours();
 *     // Number of hours since midnight of the starting day.
 * McKathlin.DayNightCycle.getTotalMinutes();
 *     // Number of minutes since midnight of the starting day.
 * McKathlin.DayNightCycle.getMinutesOfDay();
 *     // Number of minutes since midnight of the current day.
 * 
 * ============================================================================
 * Visit Tyruswoo.com to ask for help, donate, or browse more of our plugins.
 * ============================================================================
 * Version History:
 *
 * v0.1.0  Pending
 *     - Day-Night Cycle plugin released for RPG Maker MV
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Happy storytelling!
 * -McKathlin
 * 
 * @param --- Data ---
 * @default
 * 
 * @param Current Time Variable
 * @desc The ID of the variable to track the number of in-universe minutes
 * since midnight of game start day. Required.
 * @default 
 *
 * @param Daytime Switch
 * @desc The ID of the switch that signals when it is daytime.
 * If 0, no daytime signal switch will be maintained.
 * @default 0
 *
 * @param Night Switch
 * @desc The ID of the switch that signals when it is night time.
 * If 0, no night time signal switch will be maintained.
 * @default 0
 *
 * @param Outdoor Lighting Keyword
 * @desc The keyword for day-night-responsive lighting
 * in notetags or plugin commands.
 * @default Outside
 *
 * @param --- Timing ---
 * @default
 *
 * @param New Game Start Time
 * @desc A new game will start at this time of day.
 * @default 8:00 AM
 *
 * @param Dawn Start Time
 * @desc When to start dawn (sunrise) tone phases.
 * @default 6:00 AM
 *
 * @param Day Start Time
 * @desc When to set Daytime Switch to ON and Night Switch to OFF.
 * @default 6:00 AM
 *
 * @param Dusk Start Time
 * @desc When to start dusk (sunset) tone phases.
 * @default 6:00 PM
 *
 * @param Night Start Time
 * @desc When to set Night Switch to ON and Daytime Switch to OFF.
 * @default 8:00 PM
 *
 * @param Minutes Per Step
 * @desc How many minutes pass per player step, in maps where
 * <DayNight step> is enabled.
 * @default 5
 *
 * @param Minutes Per Tone Phase
 * @desc How many minutes pass from one dawn or dusk phase to the next.
 * @default 30
 *
 * @param Tone Fade Duration
 * @desc Number of frames to spend fading from one day-night screen tone
 * to the next.
 * @default 60
 * 
 * @param --- Day-Night Tones ---
 * @default
 *
 * @param Dawn Tone Phases
 * @desc The tone(s) to step through during transition from night to day.
 * @default (-68, -68, -14, 41); (-68, -68, -27, 14); (-54, -54, -27, 0); (-27, -27, -14, 0)
 * 
 * @param Daylight Tone
 * @desc The screen tone (r, g, b, gray) to apply during day time.
 * @default (0, 0, 0, 0)
 *
 * @param Dusk Tone Phases
 * @desc The tone(s) to step through during transition from day to night.
 * @default (27, -14, -14, 0); (54, -27, -27, 0); (41, -41, -27, 14); (-14, -54, -14, 41)
 *
 * @param Night Tone
 * @desc The screen tone (r, g, b, gray) to apply during night time.
 * @default (-68, -68, 0, 68)
 *
 * @param --- Simple Lighting Presets ---
 * @default
 * 
 * @param Default Lighting Keyword
 * @desc Use this keyword for the lighting preset
 * on any map that has no lighting notetag.
 * @default Outside
 *
 * @param Lighting Preset 1: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Bright
 *
 * @param Lighting Preset 1: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 1 is called
 * @default (0, 0, 0, 0)
 *
 * @param Lighting Preset 2: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Fire
 *
 * @param Lighting Preset 2: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 2 is called
 * @default (-16, -70, -100, 100)
 *
 * @param Lighting Preset 3: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Blue
 *
 * @param Lighting Preset 3: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 3 is called
 * @default (-68, -68, 0, 68)
 *
 * @param Lighting Preset 4: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Dark
 *
 * @param Lighting Preset 4: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 4 is called
 * @default (-68, -68, -68, 0)
 *
 * @param Lighting Preset 5: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default VeryDark
 *
 * @param Lighting Preset 5: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 5 is called
 * @default (-100, -100, -100, 100)
 *
 * @param Lighting Preset 6: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Black
 *
 * @param Lighting Preset 6: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 6 is called
 * @default (-100, -100, -100, 100)
 *
 * @param Lighting Preset 7: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Gold
 *
 * @param Lighting Preset 7: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 7 is called
 * @default (34, 0, -90, 100)
 *
 * @param Lighting Preset 8: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default Swamp
 *
 * @param Lighting Preset 8: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 8 is called
 * @default (-34, 0, -68, 100)
 *
 * @param Lighting Preset 9: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default 
 *
 * @param Lighting Preset 9: Tone
 * @desc The screen tone (r, g, b, gray) to apply when Lighting Preset 9 is called
 * @default (0, 0, 0, 0)
 *
 * @param Lighting Preset 10: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default 
 *
 * @param Lighting Preset 10: Tone
 * @desc The screen tone to apply when Lighting Preset 10 is called
 * @default (0, 0, 0, 0)
 *
 * @param Lighting Preset 11: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default 
 *
 * @param Lighting Preset 11: Tone
 * @desc The screen tone to apply when Lighting Preset 11 is called
 * @default (0, 0, 0, 0)
 *
 * @param Lighting Preset 12: Keyword
 * @desc The keyword to call for this lighting preset in notetags and plugin commands.
 * @default 
 *
 * @param Lighting Preset 12: Tone
 * @desc The screen tone to apply when Lighting Preset 12 is called
 * @default (0, 0, 0, 0)
 */

(() => {

	//=============================================================================
	// Constants
	//=============================================================================
	McKathlin.DayNight = McKathlin.DayNight || {};
	McKathlin.DayNight.MINUTES_PER_HOUR = 60;
	McKathlin.DayNight.HOURS_PER_DAY = 24;
	McKathlin.DayNight.MINUTES_PER_DAY =
		McKathlin.DayNight.MINUTES_PER_HOUR *
		McKathlin.DayNight.HOURS_PER_DAY;

	//=============================================================================
	// TimeSpan class
	//=============================================================================
	
	/** The TimeSpan class.
	 *  Keeps track of a timespan in terms of days, hours, and minutes.
	 *
	 * @class McKathlin.TimeSpan
	 * @constructor
	 * @param {Number} days The number of days
	 * @param {Number} hours The number of hours
	 * @param {Number} minutes The number of minutes
	 */
	McKathlin.TimeSpan = function() {
		this.initialize.apply(this, arguments);
	};

	Object.defineProperty(McKathlin.TimeSpan.prototype, 'totalMinutes', {
		get: function() { return this._totalMinutes; },
		set: function(value) { this._totalMinutes = value; },
		configurable: true
	});

	McKathlin.TimeSpan.prototype.initialize = function(days, hours, minutes) {
		days = days || 0;
		hours = hours || 0;
		minutes = minutes || 0;
		
		var totalMins = days * McKathlin.DayNight.MINUTES_PER_DAY;
		totalMins += hours * McKathlin.DayNight.MINUTES_PER_HOUR;
		totalMins += minutes;
		this.totalMinutes = totalMins;
	};

	McKathlin.TimeSpan.prototype.getMinutes = function() {
		return this.totalMinutes % McKathlin.DayNight.MINUTES_PER_HOUR;
	};

	McKathlin.TimeSpan.prototype.getHours = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_HOUR) %
			McKathlin.DayNight.HOURS_PER_DAY;
	};

	McKathlin.TimeSpan.prototype.getDays = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_DAY);
	};

	McKathlin.TimeSpan.prototype.getTotalHours = function() {
		return Math.floor(this.totalMinutes / McKathlin.DayNight.MINUTES_PER_HOUR);
	};

	McKathlin.TimeSpan.prototype.getTotalMinutes = function() {
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.getMinutesOfDay = function() {
		return this.totalMinutes % McKathlin.DayNight.MINUTES_PER_DAY;
	};

	McKathlin.TimeSpan.prototype.isDaytime = function() {
		var timeOfDay = this.getMinutesOfDay();
		return timeOfDay >= McKathlin.DayNight.Param.DayStartTimeAsMinutes &&
				timeOfDay < McKathlin.DayNight.Param.NightStartTimeAsMinutes;
	};

	McKathlin.TimeSpan.prototype.isNight = function() {
		return !this.isDaytime();
	};

	McKathlin.TimeSpan.prototype.valueOf = function() {
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.toString = function() {
		var hh = this.getHours().toString().padStart(2, '0');
		var mm = this.getMinutes().toString().padStart(2, '0');
		return "" + hh + ":" + mm;
	};

	// Either a TimeSpan or a number of minutes can be added; they are equivalent.
	McKathlin.TimeSpan.prototype.add = function(timeSpan) {
		this.totalMinutes += timeSpan.totalMinutes;
		return this.totalMinutes;
	};
	
	McKathlin.TimeSpan.prototype.addMinutes = function(minutes) {
		this.totalMinutes += minutes;
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.setForwardTo = function(timeOfDay) {
		var theirMinutesToday = timeOfDay.getMinutesOfDay();
		var myMinutesToday = this.getMinutesOfDay();
		var difference = theirMinutesToday - myMinutesToday;
		if (difference < 0) { // Target time is earlier in day than current time
			// Add a day to get the target time of day tomorrow.
			difference += McKathlin.DayNight.MINUTES_PER_DAY;
		}
		this.totalMinutes += difference;
		return this.totalMinutes;
	};

	McKathlin.TimeSpan.prototype.setTotalMinutes = function(minutes) {
		this.totalMinutes = Number(minutes);
		return this.totalMinutes;
	};

	// Returns a new TimeSpan that equals this TimeSpan
	// with the stated TimeSpan or number of minutes added.
	McKathlin.TimeSpan.prototype.plus = function(timeSpan) {
		var minuteSum = this.totalMinutes + timeSpan.totalMinutes;
		return new McKathlin.TimeSpan(0, 0, minuteSum);
	};

	// Returns a new TimeSpan that equals this TimeSpan
	// with the stated TimeSpan or number of minutes subtracted.
	McKathlin.TimeSpan.prototype.minus = function(timeSpan) {
		var minuteDifference = this.totalMinutes - timeSpan.totalMinutes;
		return new McKathlin.timeSpan(0, 0, minuteDifference);
	};


	//=============================================================================
	// Time parsing
	//=============================================================================
	
	McKathlin.DayNight.parseTimeOfDay = function(timeString) {
		var match = timeString.match(/(\d{1,2}):(\d{2}) ?(?:([ap])m?)?/i);
		if (!match) {
			throw new Error('Invalid time-of-day string: ' + timeString);
		}
		var hours = Number(match[1]);
		var minutes = Number(match[2]);
		if (match[3]) { // AM or PM suffix
			if ('P' == match[3].toUpperCase()) { // PM
				if (12 != hours) { // 12:XX PM == 12:XX military time.
					hours += 12; // e.g. 7:15 PM == 19:15 military time.
				}
			}
			else { // AM
				if (12 == hours) {
					hours = 0; // 12:XX AM == 00:XX military time.
				}
			}
		}
		return new McKathlin.TimeSpan(0, hours, minutes);
	};
	
	McKathlin.DayNight.parseTimeSpan = function(timeSpanString) {
		var days = 0;
		var hours = 0;
		var minutes = 0;
		var match;
		if (match = timeSpanString.match(/(\d+) ?d/i)) {
			days = Number(match[1]);
		}
		if (match = timeSpanString.match(/(\d+) ?h/i)) {
			hours = Number(match[1]);
		}
		if (match = timeSpanString.match(/(\d+) ?m/i)) {
			minutes = Number(match[1]);
		}
		return new McKathlin.TimeSpan(days, hours, minutes);
	};

	//=============================================================================
	// Tone parsing
	//=============================================================================

	McKathlin.DayNight.parseTone = function(toneString) {
		var matches = toneString.match(/(-?\d+)[, ]+(-?\d+)[, ]+(-?\d+)[, ]+(\d+)/);
		if (!matches) {
			throw new Error('Tone parse error: ' + toneString);
		}
		r = Number.parseInt(matches[1]) || 0;
		g = Number.parseInt(matches[2]) || 0;
		b = Number.parseInt(matches[3]) || 0;
		gray = Number.parseInt(matches[4]) || 0;
		
		return [r, g, b, gray];
	};

	McKathlin.DayNight.parseToneList = function(toneListString) {
		var matches = toneListString.match(/[\(\[\{]([\-\d, ]+)[\)\]\}]/g);
		if (!matches) {
			return new Array(0); // No matches; no tones in the list.
		}
		var tones = new Array(matches.length);
		var i;
		for (i = 0; i < matches.length; i++) {
			tones[i] = McKathlin.DayNight.parseTone(matches[i]);
		}
		return tones;
	};

	//=============================================================================
	// Parameter init
	//=============================================================================
	McKathlin.DayNight.Parameters = PluginManager.Parameters('LL_DayNight');
	McKathlin.DayNight.Param = McKathlin.DayNight.Param || {};

	// Data
	McKathlin.DayNight.Param.CurrentTimeVariableID = Number.parseInt(
		McKathlin.DayNight.Parameters['Current Time Variable']);
	if (!McKathlin.DayNight.Param.CurrentTimeVariableID) {
		window.alert("LL_DayNight's Current Time Variable is not set, " +
			"so the day-night cycle may not function as intended. " +
			"Please close this game and enter a valid Current Time Variable ID " +
			"for the LL_DayNight plugin."
		);
	}
	McKathlin.DayNight.Param.DaytimeSwitchID = Number.parseInt(
		McKathlin.DayNight.Parameters['Daytime Switch']);
	McKathlin.DayNight.Param.NightSwitchID = Number.parseInt(
		McKathlin.DayNight.Parameters['Night Switch']);
	McKathlin.DayNight.Param.OutdoorLightingKeyword = String(
		McKathlin.DayNight.Parameters['Outdoor Lighting Keyword']).trim().toLowerCase();

	// Element bonuses
	McKathlin.DayNight.Param.DaytimeElementalEffectsString = String(
		McKathlin.DayNight.Parameters['Daytime Elemental Effects']);
	McKathlin.DayNight.Param.NightElementalEffectsString = String(
		McKathlin.DayNight.Parameters['Night Elemental Effects']);

	// Timing
	McKathlin.DayNight.Param.NewGameStartTime = McKathlin.DayNight.parseTimeOfDay(
		McKathlin.DayNight.Parameters['New Game Start Time']);
	McKathlin.DayNight.Param.DawnStartTime = McKathlin.DayNight.parseTimeOfDay(
		McKathlin.DayNight.Parameters['Dawn Start Time']);
	McKathlin.DayNight.Param.DayStartTime = McKathlin.DayNight.parseTimeOfDay(
		McKathlin.DayNight.Parameters['Day Start Time']);
	McKathlin.DayNight.Param.DuskStartTime = McKathlin.DayNight.parseTimeOfDay(
		McKathlin.DayNight.Parameters['Dusk Start Time']);
	McKathlin.DayNight.Param.NightStartTime = McKathlin.DayNight.parseTimeOfDay(
		McKathlin.DayNight.Parameters['Night Start Time']);
	McKathlin.DayNight.Param.MinutesPerStep = Number.parseInt(
		McKathlin.DayNight.Parameters['Minutes Per Step']);
	McKathlin.DayNight.Param.MinutesPerTonePhase = Number(
		McKathlin.DayNight.Parameters['Minutes Per Tone Phase']);
	McKathlin.DayNight.Param.ToneFadeDuration = Number.parseInt(
		McKathlin.DayNight.Parameters['Tone Fade Duration']);

	// Tones
	McKathlin.DayNight.Param.DawnTonePhases = McKathlin.DayNight.parseToneList(
		McKathlin.DayNight.Parameters['Dawn Tone Phases']);
	McKathlin.DayNight.Param.DaylightTone = McKathlin.DayNight.parseTone(
		McKathlin.DayNight.Parameters['Daylight Tone']);
	McKathlin.DayNight.Param.DuskTonePhases = McKathlin.DayNight.parseToneList(
		McKathlin.DayNight.Parameters['Dusk Tone Phases']);
	McKathlin.DayNight.Param.NightTone = McKathlin.DayNight.parseTone(
		McKathlin.DayNight.Parameters['Night Tone']);

	// Timing (derived)
	McKathlin.DayNight.Param.DawnEndTime = McKathlin.DayNight.Param.DawnStartTime +
		(McKathlin.DayNight.Param.MinutesPerTonePhase * McKathlin.DayNight.Param.DawnTonePhases.length);
	McKathlin.DayNight.Param.DuskEndTime = McKathlin.DayNight.Param.DuskStartTime +
		(McKathlin.DayNight.Param.MinutesPerTonePhase * McKathlin.DayNight.Param.DuskTonePhases.length);

	// Simple Lighting Presets
	McKathlin.DayNight.Param.LightingPresets = new Array();
	McKathlin.DayNight.Param.LIGHTING_COLLECTION_LENGTH = 12;
	var i;
	for (i = 1; i <= McKathlin.DayNight.Param.LIGHTING_COLLECTION_LENGTH; i++) {
		var keyword = String(
			McKathlin.DayNight.Parameters['Lighting Preset ' + i + ': Keyword']).toLowerCase();
		if (!keyword) {
			continue; 
		}
		var tone = McKathlin.DayNight.parseTone(
			McKathlin.DayNight.Parameters['Lighting Preset ' + i + ': Tone']);
		McKathlin.DayNight.Param.LightingPresets[keyword] = tone;
	}

	//=============================================================================
	// Day-Night timekeeping
	//=============================================================================

	McKathlin.DayNightCycle = new McKathlin.TimeSpan();
	McKathlin.DayNightCycle._switching = false;

	Object.defineProperty(McKathlin.DayNightCycle, 'totalMinutes', {
		get: function() {
			return $gameSystem.totalMinutes;
		},
		set: function(value) {
			this.changeTimeTo(value);
		},
		configurable: true
	});

	McKathlin.DayNightCycle.changeTimeTo = function(minutes) {
		this._switching = true;
		$gameSystem.totalMinutes = minutes;

		this.updateTime();
		this._switching = false;

		$gameMap.onTimeChanged();
	};

	// Update all time-based variables and switches.
	McKathlin.DayNightCycle.updateTime = function() {
		var isDay = this.isDaytime();
		$gameSwitches.setValue(McKathlin.DayNight.Param.DaytimeSwitch, isDay);
		$gameSwitches.setValue(McKathlin.DayNight.Param.NightSwitch, !isDay);

		$gameVariables.setValue(McKathlin.DayNight.Param.DaysPassedVariable, this.getDays());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentHourVariable, this.getHours());
		$gameVariables.setValue(McKathlin.DayNight.Param.CurrentMinuteVariable, this.getMinutes());
	};

	McKathlin.DayNightCycle.now = function() {
		return this;
	};

	McKathlin.DayNightCycle.reset = function() {
		McKathlin.DayNightCycle.setTotalMinutes(0);
		McKathlin.DayNightCycle.setForwardTo(new McKathlin.TimeSpan(
			0, 0, McKathlin.DayNight.Param.NewGameStartTimeAsMinutes));
	};

	//=============================================================================
	// Lighting application and tone-finding
	//=============================================================================
	
	Game_Map.prototype.applyLightingPreset = function(presetName, duration=0) {
		this.lightingType = presetName;
		this.isOutside = (this.lightingType == McKathlin.DayNight.Param.OutdoorLightingKeyword);
		this.mapTone = McKathlin.DayNightCycle.getToneByKeyword(this.lightingType);
		$gameScreen.startTint(this.mapTone, duration);
	};

	McKathlin.DayNightCycle.getToneByKeyword = function(keyword) {
		var tone = null;
		if (keyword) {
			keyword = keyword.toLowerCase();
			if (keyword == McKathlin.DayNight.Param.OutdoorLightingKeyword) {
				tone = this.getOutsideTone();
			} else {
				let preset = McKathlin.DayNight.Param.SimpleLightingPresets[keyword];
				tone = preset ? preset.tone : null;
			}
		}
		
		if (!tone) {
			tone = McKathlin.DayNight.DEFAULT_TONE;
		}
		return tone;
	};

	McKathlin.DayNightCycle.getOutsideTone = function() {
		var time = this.getMinutesOfDay();
		if (time < McKathlin.DayNight.Param.DawnStartTimeAsMinutes) {
			// night, between midnight and dawn
			return McKathlin.DayNight.Param.NightTone;
		}
		else if (time < McKathlin.DayNight.Param.DawnEndTimeAsMinutes) {
			// dawn
			phase = Math.floor((time - McKathlin.DayNight.Param.DawnStartTimeAsMinutes) /
				McKathlin.DayNight.Param.MinutesPerTonePhase);
			return McKathlin.DayNight.Param.DawnTonePhases[phase];
		}
		else if (time < McKathlin.DayNight.Param.DuskStartTimeAsMinutes) {
			// daytime light is after dawn and before dusk
			return McKathlin.DayNight.Param.DaylightTone;
		}
		else if (time < McKathlin.DayNight.Param.DuskEndTimeAsMinutes) {
			phase = Math.floor((time - McKathlin.DayNight.Param.DuskStartTimeAsMinutes) /
				McKathlin.DayNight.Param.MinutesPerTonePhase);
			return McKathlin.DayNight.Param.DuskTonePhases[phase];
		}
		else {
			// night, between dusk and midnight
			return McKathlin.DayNight.Param.NightTone;
		}
	}

	//=============================================================================
	// Game Switches protection
	//=============================================================================

	McKathlin.DayNight.DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function() {
		McKathlin.DayNight.DataManager_setupNewGame.call(this);
		McKathlin.DayNight.reset();
	};

	McKathlin.DayNight.Game_Switches_setValue = Game_Switches.prototype.setValue;
	Game_Switches.prototype.setValue = function(switchId, value) {
		if (switchId > 0 && !McKathlin.DayNight._switching) {
			if (switchId == McKathlin.Param.DaytimeSwitchID ||
				switchId == McKathlin.Param.NightSwitchID) {
				throw new Error("Switch " + switchId +
					" is reserved for use by McKathlin.DayNight plugin," +
					" and should not be set outside of it."
				);
			}
		}
		McKathlin.DayNight.Game_Switches_setValue.call(this, switchId, value);
	};

	//=============================================================================
	// Map Notetags
	//=============================================================================

	// TODO: Implement notetags without requiring dependencies

	//=============================================================================
	// Party Step
	//=============================================================================

	McKathlin.DayNight.Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
	Game_Party.prototype.increaseSteps = function() {
		McKathlin.DayNight.Game_Party_increaseSteps.call(this);
		if ($gameMap && $gameMap.minutesPerStep > 0) {
			McKathlin.DayNightCycle.addMinutes($gameMap.minutesPerStep);
		}
	};

	//=============================================================================
	// Plugin Commands
	//=============================================================================

	// TODO: Implement plugin commands without dependencies

})();