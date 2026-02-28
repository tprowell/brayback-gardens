# Brayback Gardens — Product Requirements Document (v1)

## Overview

Brayback Gardens is a web application that helps plan, track, and manage two residential gardens on a rural property in Laytonville, CA (95454, USDA Zone 9a/9b). The primary user is the homeowner who manages the gardens day-to-day, with her partner providing support. The app needs to work on both desktop (for planning sessions) and mobile (for in-garden use).

The growing season starts soon — seeds can be started in the greenhouse now, last frost is early May, and the goal is to have a usable tool before the season kicks off.

## Users

- **Primary:** Wife — drives all garden decisions, does most of the hands-on work. Needs quick mobile access for logging and notes while in the garden.
- **Secondary:** Husband — supports planning and heavy lifting. Uses desktop mostly for planning sessions together.

Both users share the same data. No authentication needed for v1 — single household, single instance.

## The Two Gardens

### Upper Garden (Original)
- **Size:** ~40 x 15 ft
- **Description:** Older slightly raised beds. Transitioning to a mini-orchard and berry plot.
- **Trees:** One Granny Smith apple (likely removing), one unknown sweet apple variety (trying to save), new Fuji apple, peach, persimmon.
- **Berries:** Existing (want more), adding blueberries.
- **Issues:** Aphid problems on leafy greens (lettuce, kale). More shaded than lower garden.
- **Water:** Mix of hand-watering and some irrigation.

### Lower Garden (New)
- **Size:** ~60 x 40 ft
- **Description:** Brand new space behind the barn, above the creek. Best sun exposure with a shaded area on the creek side (oak tree canopy). Small Costco greenhouse on-site. A few metal trough raised beds from last year, otherwise wide open for design.
- **Vibe:** "High-end" — this is as much a living space as a garden. Plans include a sitting area, possible plunge pool, outdoor kitchen/patio under the barn overhang.
- **Water:** Will run water from the barn. Possible creek water right. Goal is full automation eventually.
- **Greenhouse:** Used for starting seeds and overwintering plants.

## What They Grow

### Vegetables
| Crop | Notes |
|------|-------|
| Zucchini | Grows well. Cap at 2 plants. |
| Green beans | Need more than last year. Also for pickling. |
| Tomatoes | Fewer than before — salad/sandwich use, some paste variety for pizza sauce & tomato paste. |
| Cucumbers | More — heavy use for bread & butter pickles. |
| Hot peppers | For homemade seasonings. |
| Carrots | New this year, expect to eat a lot. |
| Sweet potatoes | New this year, expect to eat a lot. |
| Potatoes | Want to grow. |
| Lettuce | Good, but had aphid issues in upper garden. Move to lower? |
| Kale | Same as lettuce — aphid issues. |

### Fruit & Berries
| Crop | Notes |
|------|-------|
| Apples | Fuji (new), sweet unknown variety (keep), Granny Smith (maybe remove) |
| Peach | New tree |
| Persimmon | New tree |
| Blueberries | Want to add |
| Other berries | Existing, want more (for jams) |

### Herbs
Specific varieties TBD. Includes herbs for cooking and drying.

### Flowers
Three purposes: pollinator attraction, cutting flowers for the house, and making the lower garden space beautiful.

### Preserving Goals
| Product | Source crops |
|---------|------------|
| Bread & butter pickles | Cucumbers |
| Pickled string beans | Green beans |
| Pepper jelly | Hot peppers |
| Peach jam | Peaches |
| Berry jam | Blueberries, other berries |
| Dried herbs | Various herbs |
| Tomato paste | Paste tomatoes |
| Pizza sauce | Paste tomatoes |

## v1 Features

### 1. Garden Spaces & Layout Map
A simple visual representation of each garden where users can:
- See a top-down grid/map of each garden
- Place and label beds, trees, structures (greenhouse, barn, sitting area)
- Mark sun/shade zones
- Assign plants to locations
- Simple drag-and-drop or click-to-place — not a full design tool yet

This doesn't need to be pixel-perfect landscape design. Think more like a planning sketch on graph paper that lives in the app.

### 2. Plant Library
A curated database of plants relevant to Zone 9a/9b with:
- Name, variety, category (vegetable, herb, fruit, flower, berry)
- Days to maturity
- Planting windows (indoor start, transplant, direct sow) based on ~May 1 last frost
- Spacing requirements
- Sun/water needs
- Basic companion planting notes (what plays well together)
- Harvest window
- Preserve suitability (flag crops tied to preserving goals)

Pre-seeded with the crops listed above. Users can add custom entries.

### 3. Planting Log
The core record-keeping feature:
- Log each planting: what, where (which garden + bed/location), when, quantity, variety
- Auto-calculate estimated harvest date from planting date + days to maturity
- Status tracking: planned, started (indoors), transplanted, growing, harvesting, done
- Season filter — view current season or look back at prior years

### 4. Harvest Tracker
A view built on top of the planting log:
- Timeline/calendar showing expected harvest windows for everything planted
- Visual indicator of what's coming up soon
- Ability to log actual harvest (date, quantity/weight)
- Comparison: expected vs. actual

### 5. Task & Reminder System
- Auto-generated tasks based on planting log (e.g., "transplant tomato starts" 6 weeks after indoor sowing)
- Manual task creation (e.g., "build new raised bed", "run water line")
- Simple status: to-do, done
- Date-based — "this week" view is the primary interface
- Assignable to either user (or unassigned)

### 6. Garden Notes
Quick capture for observations while in the garden:
- Free-text notes with optional photo attachment
- Tagged to a garden, bed, or specific plant
- Timestamped
- Searchable
- Examples: "aphids showing up on kale again", "zucchini is exploding", "that shaded corner stays too wet"

### 7. Dashboard
The landing page — "what's going on right now":
- What needs attention this week (tasks due)
- What's ready or nearly ready to harvest
- Recent notes
- Quick-add buttons for common actions (log planting, add note, complete task)
- Season summary stats (what's planted, what's producing)

## Technical Requirements

- **Web app** — works in mobile browser and desktop browser
- **Responsive design** — mobile-first for in-garden use, but full-featured on desktop
- **No auth for v1** — single household, runs locally or on a simple host
- **Data persistence** — needs to survive across sessions. Local database or simple backend.
- **Fast and simple** — this isn't enterprise software. It should feel lightweight and pleasant to use.

## Non-Goals for v1
- User authentication / multi-tenant
- Advanced garden designer / drag-and-drop landscape tool
- Pest & disease management
- Budget tracking
- Weather integration
- Automated irrigation control
- AI-powered planting suggestions

## Success Criteria
- Both gardens are mapped with beds and plants placed
- Every planting is logged with expected harvest dates
- They can open the app on a phone in the garden and quickly add a note
- The dashboard tells them what to do this week
- At end of season, they can review what worked and what didn't
