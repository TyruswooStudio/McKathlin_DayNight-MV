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
 * @plugindesc Configure and track a day-night cycle.
 * @author McKathlin
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
 * @desc The keyword that calls for outdoor lighting
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



