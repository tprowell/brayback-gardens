-- Seed default plant library for Zone 9a/9b (Laytonville, CA)
-- Last frost approximately May 1; first frost approximately October 15
-- All planting windows expressed as weeks relative to last frost (negative = before)
-- All plants are defaults (is_default = true, created_by = NULL)

-- ============================================================================
-- VEGETABLES
-- ============================================================================

INSERT INTO plants (
  name, variety, category, description,
  days_to_maturity_min, days_to_maturity_max, spacing_inches,
  sun_requirement, water_need, planting_method,
  indoor_start_weeks, indoor_end_weeks,
  transplant_start_weeks, transplant_end_weeks,
  direct_sow_start_weeks, direct_sow_end_weeks,
  companion_plants, avoid_near,
  harvest_instructions, preserve_methods, preserve_notes,
  notes, is_default, created_by
) VALUES

-- 1. Zucchini
(
  'Zucchini', NULL, 'vegetable',
  'Prolific summer squash that produces heavily from a single plant. A garden staple that grows fast and rewards frequent harvesting.',
  45, 60, 36,
  'full_sun', 'moderate', 'both',
  -4, -2,
  0, 2,
  0, 4,
  'Beans, corn, nasturtium, marigold, radishes',
  'Potatoes, other squash (cross-pollination)',
  'Harvest at 6-8 inches for best flavor and texture. Check plants daily during peak production; fruit can double in size overnight. Cut stems with a knife rather than twisting.',
  '{freezing, other}',
  'Shred and freeze in measured portions for zucchini bread. Can also be spiralized and frozen for noodle substitutes. Surplus makes excellent gifts to neighbors.',
  'One or two plants are usually plenty for a household. Succession-plant only if you want continuous harvest into fall. Powdery mildew common in late summer; provide good air circulation.',
  true, NULL
),

-- 2. Green Beans (Bush)
(
  'Green Beans', 'Bush (Provider)', 'vegetable',
  'Compact bush beans that produce a concentrated harvest without needing trellising. Provider variety is cold-tolerant and reliable.',
  50, 60, 6,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -1, 8,
  'Corn, squash, carrots, celery, cucumbers, strawberries',
  'Onions, garlic, fennel, peppers',
  'Pick when pods are firm, crisp, and pencil-thick, before seeds bulge visibly. Harvest every 2-3 days to encourage continued production. Best picked in the morning when pods snap cleanly.',
  '{canning, freezing, fermenting}',
  'Excellent for pickled dilly beans (pack vertically in pint jars with garlic, dill, and hot pepper; process in water bath 10 min). Blanch and freeze for year-round use. Can ferment for probiotic green beans.',
  'Succession-plant every 2-3 weeks for continuous harvest. Fix nitrogen in the soil; good rotation crop before heavy feeders. Do not cultivate or harvest when foliage is wet to prevent disease spread.',
  true, NULL
),

-- 3. Green Beans (Pole)
(
  'Green Beans', 'Pole (Kentucky Wonder)', 'vegetable',
  'Classic pole bean that climbs 6-8 feet and produces over a longer season than bush types. Excellent fresh flavor with tender, slightly fuzzy pods.',
  60, 70, 6,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 6,
  'Corn, squash, carrots, radishes, marigolds',
  'Onions, garlic, fennel, beets',
  'Harvest when pods are 6-8 inches and still tender. Pick regularly to keep plants producing. Older pods become stringy and tough.',
  '{canning, freezing, fermenting}',
  'Same as bush beans for pickled dilly beans. Pole beans tend to be slightly more flavorful and hold up well in canning. Longer season means more volume for preserving.',
  'Needs a sturdy trellis, teepee, or fence at least 6 feet tall. Plant in a circle around a teepee or along a trellis. One planting produces for 6-8 weeks.',
  true, NULL
),

-- 4. Tomato (Cherokee Purple)
(
  'Tomato', 'Cherokee Purple', 'vegetable',
  'Heirloom beefsteak with dusky rose-purple skin and rich, complex, sweet-smoky flavor. One of the best-tasting tomatoes you can grow.',
  75, 90, 24,
  'full_sun', 'moderate', 'transplant',
  -8, -6,
  0, 2,
  NULL, NULL,
  'Basil, carrots, parsley, marigolds, nasturtium',
  'Brassicas, fennel, dill (mature), other nightshades in same spot year after year',
  'Harvest when shoulders are deeply colored and fruit gives slightly to gentle pressure. Color will be a mottled dark pink-brown-green. Flavor peaks at room temperature; never refrigerate.',
  '{canning, freezing}',
  'Exceptional slicing tomato; best eaten fresh. Flesh is too soft for paste but excellent in fresh sauces that get frozen. Can be canned as crushed tomatoes. Juice oxidizes dark so not the prettiest for whole canning.',
  'Indeterminate; needs strong staking or caging. Prone to cracking in heavy rain. Thin fruit clusters to 3-4 tomatoes for larger fruit. Prune suckers below first flower cluster.',
  true, NULL
),

-- 5. Tomato (San Marzano)
(
  'Tomato', 'San Marzano', 'vegetable',
  'The definitive paste tomato. Dense, meaty flesh with few seeds and low moisture makes it ideal for sauce, paste, and canning. Elongated plum shape.',
  78, 85, 24,
  'full_sun', 'moderate', 'transplant',
  -8, -6,
  0, 2,
  NULL, NULL,
  'Basil, carrots, parsley, marigolds, celery',
  'Brassicas, fennel, dill (mature), corn',
  'Harvest when fully red and slightly soft. For paste and sauce, let ripen fully on the vine for maximum sugar content. Can be harvested slightly early and ripened indoors before first frost.',
  '{canning, freezing}',
  'The best tomato for homemade pizza sauce and tomato paste. Core and halve, slow-roast at 300F for 2-3 hours, then blend. For paste, continue reducing. Process in water bath (35 min for quarts with added acid) or pressure can. Freeze whole on sheet pans for easy winter sauce.',
  'Indeterminate; needs tall sturdy cages or stakes. Heavy producer mid-to-late season. Plant 6-8 plants if you want enough for a full year of sauce and paste. Reduce watering slightly as fruit ripens for more concentrated flavor.',
  true, NULL
),

-- 6. Tomato (Cherry)
(
  'Tomato', 'Cherry (Sungold)', 'vegetable',
  'Incredibly sweet and productive cherry tomato with golden-orange fruit. Ripens early and produces until frost. A garden candy that kids and adults devour.',
  55, 65, 24,
  'full_sun', 'moderate', 'transplant',
  -8, -6,
  0, 2,
  NULL, NULL,
  'Basil, chives, parsley, carrots, marigolds',
  'Brassicas, fennel, dill (mature)',
  'Harvest when fruit is deep golden-orange and pulls easily from the stem. Check daily in peak season. Fruit that cracks has been overwatered or rained on; harvest cracked fruit immediately and eat same day.',
  '{freezing, other}',
  'Best fresh but can be slow-roasted and frozen for winter pasta. Halve, toss with olive oil and garlic, roast at 275F for 2 hours. Freeze flat on sheet pans. Also makes a beautiful quick-pickled garnish.',
  'Indeterminate and vigorous; needs a tall cage or trellis. Extremely prolific. One plant is enough for fresh eating; plant two if you want to preserve. Skin is thin and cracks easily in rain.',
  true, NULL
),

-- 7. Cucumber (Pickling)
(
  'Cucumber', 'Pickling (National Pickling)', 'vegetable',
  'Compact pickling cucumber bred specifically for consistent, firm pickles. Blocky shape with bumpy skin that holds brine well.',
  50, 60, 12,
  'full_sun', 'high', 'both',
  -3, -2,
  0, 2,
  0, 4,
  'Beans, corn, peas, radishes, sunflowers, dill',
  'Potatoes, aromatic herbs (sage, mint)',
  'For pickles, harvest at 2-4 inches for gherkins or 4-6 inches for standard dills. Pick every 1-2 days; oversized fruit signals the plant to stop producing. Harvest in the morning for crispest texture.',
  '{canning, fermenting}',
  'The bread & butter pickle cucumber. Slice 1/4 inch thick with thin-sliced onions; soak in ice water with salt for 2 hours. Make syrup of vinegar, sugar, turmeric, celery seed, and mustard seed. Pack and process in water bath (10 min pints). Also excellent as classic fermented dill pickles in a salt brine for 1-2 weeks.',
  'Succession-plant every 2-3 weeks for a continuous pickle supply. Grows well on a trellis to save space and keep fruit clean. Consistent watering is critical; bitter fruit results from water stress.',
  true, NULL
),

-- 8. Cucumber (Slicing)
(
  'Cucumber', 'Slicing (Marketmore 76)', 'vegetable',
  'Classic dark-green slicing cucumber with crisp, mild flesh. Disease-resistant and reliable. Straight fruit with smooth skin.',
  55, 65, 12,
  'full_sun', 'high', 'both',
  -3, -2,
  0, 2,
  0, 4,
  'Beans, corn, peas, lettuce, sunflowers, dill',
  'Potatoes, aromatic herbs (sage)',
  'Harvest at 6-8 inches for best flavor and texture. Larger fruit become seedy and bitter. Cut from vine with scissors rather than pulling.',
  '{fermenting}',
  'Primarily a fresh eating cucumber. Can be used for refrigerator pickles (not ideal for canning due to higher water content). Slice into spears for quick fridge pickles with rice vinegar and sesame.',
  'Trellising produces straighter fruit and better air circulation. Very productive; 2-3 plants are enough for fresh eating. Water consistently and mulch heavily to retain soil moisture.',
  true, NULL
),

-- 9. Jalapeno
(
  'Jalapeno', NULL, 'vegetable',
  'Medium-heat pepper (2,500-8,000 SHU) essential for salsa, poppers, and pickling. Thick-walled and versatile. Can be harvested green or left to ripen red for more heat and sweetness.',
  70, 80, 18,
  'full_sun', 'moderate', 'transplant',
  -10, -8,
  0, 4,
  NULL, NULL,
  'Basil, carrots, onions, tomatoes, parsley',
  'Fennel, brassicas, apricots',
  'Harvest green at 3-4 inches for classic jalapeno flavor. For red jalapenos (chipotles), leave on plant until fully red. Corking (white stretch marks) indicates heat and maturity. Wear gloves when handling hot peppers.',
  '{canning, drying, fermenting}',
  'Essential for pepper jelly: blend red and green jalapenos with sugar and vinegar, add pectin, and process in water bath (10 min half-pints). Also excellent pickled (cowboy candy), fermented into hot sauce, or smoked and dried as chipotles.',
  'Peppers need warm soil (65F+) to thrive. In Zone 9a, wait until soil is truly warm. Slight water stress after fruit set increases heat. Very productive; 3-4 plants produce abundantly.',
  true, NULL
),

-- 10. Habanero
(
  'Habanero', NULL, 'vegetable',
  'Fiery pepper (100,000-350,000 SHU) with fruity, citrusy undertones beneath the intense heat. Lantern-shaped fruit ripen from green to orange.',
  90, 100, 18,
  'full_sun', 'moderate', 'transplant',
  -12, -10,
  2, 4,
  NULL, NULL,
  'Basil, tomatoes, carrots, onions',
  'Fennel, brassicas',
  'Harvest when fully orange for best flavor and heat. Fruit should be firm and glossy. Always wear gloves; habanero oils cause serious skin and eye burns. One plant produces 30-50+ peppers.',
  '{drying, canning, fermenting}',
  'Blend with jalapenos and other peppers for a complex pepper jelly. Dry and grind into habanero powder for year-round heat. Ferment with garlic and salt for Caribbean-style hot sauce. A little goes a long way in all preserves.',
  'Needs a long, warm season. Start indoors very early. Slow to germinate (10-14 days) and slow to grow initially. Mulch and water consistently but do not overwater. One or two plants is plenty unless you want serious heat inventory.',
  true, NULL
),

-- 11. Cayenne
(
  'Cayenne', NULL, 'vegetable',
  'Thin-walled hot pepper (30,000-50,000 SHU) that dries beautifully. Long, slender red fruit are a kitchen staple for adding heat to any dish.',
  70, 80, 18,
  'full_sun', 'moderate', 'transplant',
  -10, -8,
  0, 4,
  NULL, NULL,
  'Basil, tomatoes, carrots, parsley, oregano',
  'Fennel, brassicas',
  'Harvest when bright red and firm for maximum flavor and heat. Can also pick green for milder heat. Thin walls mean they dry faster than thick-walled peppers.',
  '{drying, canning, fermenting}',
  'The easiest pepper to dry: string on thread through stems and hang in a warm, dry place for 2-3 weeks. Grind into cayenne powder. Also excellent in pepper jelly blends and fermented hot sauce. Crush dried flakes for pizza seasoning.',
  'Very productive plants. Thin walls make them the best choice for drying. Harvest regularly to encourage more production. 2-3 plants will produce more dried pepper flakes than you can use in a year.',
  true, NULL
),

-- 12. Carrots
(
  'Carrots', 'Danvers Half Long', 'vegetable',
  'Reliable storage carrot with broad shoulders and blunt tips. Grows well in heavier soils where longer varieties struggle. Sweet flavor improves after light frost.',
  65, 80, 3,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -4, 8,
  'Tomatoes, lettuce, chives, onions, rosemary, sage',
  'Dill (attracts carrot fly), parsnips',
  'Harvest when tops of roots are 3/4 inch diameter at the soil line. Loosen soil alongside the row with a fork before pulling. Fall-harvested carrots after light frost are sweeter due to starch-to-sugar conversion.',
  '{canning, freezing, fermenting, other}',
  'Store unwashed in damp sand in a cool place for months. Blanch and freeze diced for soups and stews. Can pressure-can in chunks. Ferment with ginger for probiotic carrot sticks. Shred into relish.',
  'Sow seed shallowly (1/4 inch) and keep moist until germination (10-14 days). Thin ruthlessly to 3 inches apart. Rocks and heavy clay cause forking; amend soil with compost. Succession-plant every 3 weeks.',
  true, NULL
),

-- 13. Sweet Potatoes
(
  'Sweet Potatoes', 'Beauregard', 'vegetable',
  'Heat-loving vine that produces coppery-skinned, orange-fleshed tubers. Beauregard is the standard variety: reliable, sweet, and stores well. Grows from slips, not seed.',
  90, 120, 12,
  'full_sun', 'low', 'transplant',
  NULL, NULL,
  2, 6,
  NULL, NULL,
  'Beans, corn, thyme',
  'Squash (compete for space), tomatoes',
  'Harvest before first frost when foliage begins to yellow, or after 90-120 days. Cure at 80-85F and high humidity for 10 days to convert starches to sugars and heal skin nicks. Handle gently; sweet potatoes bruise easily.',
  '{other}',
  'After curing, store in a cool (55-60F), dark, dry place for 6+ months. Do not refrigerate. Can also be cubed, blanched, and frozen. Sweet potato butter can be canned with added acid.',
  'Grow from slips (rooted sprouts) purchased or started from a grocery store sweet potato in water. Need at least 90 days of warm weather. Black plastic mulch warms soil and suppresses weeds. Vines spread 6-8 feet.',
  true, NULL
),

-- 14. Potato (Yukon Gold)
(
  'Potato', 'Yukon Gold', 'vegetable',
  'All-purpose golden-fleshed potato with buttery flavor and creamy texture. Excellent for roasting, mashing, and soups. Medium-early maturity.',
  70, 90, 12,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -4, -1,
  'Beans, corn, cabbage, marigolds, horseradish',
  'Tomatoes, peppers, eggplant (share diseases), squash, sunflowers',
  'Harvest new potatoes 2-3 weeks after flowering for small, tender spuds. For storage potatoes, wait until foliage completely dies back, then wait 2 more weeks for skins to set. Dig carefully with a garden fork on a dry day.',
  '{other}',
  'Cure in a dark, airy place at 45-60F for 2 weeks. Store in a cool (38-45F), dark, humid location for 4-6 months. Never store near onions (they cause each other to sprout). Do not wash until ready to use.',
  'Plant seed potatoes (cut pieces with 2-3 eyes) 4 inches deep. Hill soil around stems as they grow to prevent green tubers (green = toxic solanine). Rotate planting location yearly to prevent disease buildup.',
  true, NULL
),

-- 15. Potato (Russet)
(
  'Potato', 'Russet (Burbank)', 'vegetable',
  'The classic baking potato with thick, rough skin and fluffy white flesh. High starch content makes it ideal for baking, frying, and mashing. Stores very well.',
  80, 100, 12,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -4, -1,
  'Beans, corn, cabbage, marigolds, horseradish',
  'Tomatoes, peppers, eggplant, squash, sunflowers',
  'Let foliage die completely and wait 2 weeks before digging for storage quality. Larger tubers develop with wider spacing and consistent hilling. Avoid nicking skins when harvesting.',
  '{other}',
  'Stores the longest of common potato varieties. Cure and store like Yukon Gold. Thick skin protects against storage rot. Excellent for dehydrating into hash browns or potato flakes.',
  'Needs consistent moisture during tuber formation (flowering period). Irregular watering causes knobs and hollow heart. Late-season variety; plant early and be patient.',
  true, NULL
),

-- 16. Lettuce (Butterhead)
(
  'Lettuce', 'Butterhead (Buttercrunch)', 'vegetable',
  'Tender, sweet butterhead lettuce with loosely folded, buttery-textured leaves. Heat-tolerant for a lettuce; slower to bolt than many varieties. Compact heads.',
  45, 60, 10,
  'partial_sun', 'moderate', 'both',
  -6, -4,
  -4, -2,
  -4, 4,
  'Carrots, radishes, strawberries, chives, dill',
  'Celery, parsley',
  'Harvest outer leaves as needed or cut whole head at the base when center feels firm. Best harvested in the morning. In hot weather, harvest before bolting (watch for center elongation).',
  NULL,
  NULL,
  'Cool-season crop; plant early spring and again in late summer for fall harvest. Provide afternoon shade in summer or it will bolt. Succession-plant every 2 weeks for continuous harvest. Light row cover extends season.',
  true, NULL
),

-- 17. Lettuce (Romaine)
(
  'Lettuce', 'Romaine (Parris Island)', 'vegetable',
  'Tall, upright romaine with crisp, dark green outer leaves and a pale, crunchy heart. Classic Caesar salad lettuce. More heat-tolerant than many romaines.',
  60, 70, 10,
  'partial_sun', 'moderate', 'both',
  -6, -4,
  -4, -2,
  -4, 4,
  'Carrots, radishes, strawberries, chives, beans',
  'Celery, parsley',
  'Cut-and-come-again: harvest outer leaves for continuous harvest, or cut whole head 1 inch above soil for regrowth. Romaine hearts form when inner leaves tighten and become pale.',
  NULL,
  NULL,
  'Like all lettuce, a cool-season crop. In Zone 9a, best as a spring or fall crop. Can extend harvest with shade cloth (30-50%) in early summer. Bolt-resistant variety but will still bolt in sustained heat above 80F.',
  true, NULL
),

-- 18. Kale (Lacinato)
(
  'Kale', 'Lacinato (Dinosaur)', 'vegetable',
  'Italian heirloom with long, dark blue-green, deeply textured leaves. More tender and less bitter than curly kale. Sweeter after frost. Stunning ornamental quality.',
  55, 65, 18,
  'full_sun', 'moderate', 'both',
  -6, -4,
  -4, -2,
  -4, 4,
  'Beets, celery, herbs, onions, potatoes',
  'Strawberries, tomatoes, pole beans',
  'Harvest lowest leaves first, leaving the growing crown intact. Leaves are best at 8-12 inches. Never strip more than a third of leaves at once. Flavor sweetens dramatically after frost.',
  '{freezing, drying}',
  'Strip leaves from stems, blanch 2 minutes, shock in ice water, squeeze dry, and freeze in portions. Dehydrate into kale chips for snacking. Frozen kale is excellent in soups, smoothies, and pasta.',
  'One of the most cold-hardy vegetables. In Zone 9a, kale can grow nearly year-round. Spring-planted kale may become bitter in summer heat; fall-planted kale thrives through winter. Remove flower stalks in spring of second year or let it go to seed.',
  true, NULL
),

-- 19. Kale (Curly)
(
  'Kale', 'Curly (Winterbor)', 'vegetable',
  'Extremely cold-hardy curly kale with tightly ruffled, dark green leaves. Robust flavor that stands up well to cooking. Handles frost, wind, and neglect.',
  50, 65, 18,
  'full_sun', 'moderate', 'both',
  -6, -4,
  -4, -2,
  -4, 4,
  'Beets, celery, herbs, onions, potatoes, dill',
  'Strawberries, tomatoes, pole beans',
  'Same as Lacinato: harvest lower leaves first, keep crown growing. Curly varieties are tougher and better suited to cooking than raw salads. Massage raw leaves with oil and acid if using in salads.',
  '{freezing, drying}',
  'Prep and freeze same as Lacinato. Curly kale makes better dehydrated kale chips due to its ruffled surface holding seasoning. Toss with olive oil, salt, and nutritional yeast before dehydrating.',
  'Plant in late summer for a fall and winter harvest that gets sweeter with each frost. Winterbor is one of the hardiest varieties and will survive Zone 9a winters without protection. Aphids can be an issue; blast with water or use insecticidal soap.',
  true, NULL
),

-- ============================================================================
-- FRUIT
-- ============================================================================

-- 20. Fuji Apple
(
  'Apple', 'Fuji', 'fruit',
  'Sweet, crisp, and aromatic apple that stores exceptionally well. Dense flesh with high sugar content. Needs a pollination partner (another apple variety within 50 feet).',
  NULL, NULL, NULL,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Chives, nasturtium, comfrey, clover (understory)',
  'Walnut trees (juglone toxicity), grass directly around trunk',
  'Harvest mid-to-late October in Zone 9a when fruit separates easily from the spur with a gentle upward twist. Skin should have a yellow-green background color beneath the red blush. Taste-test is the best indicator.',
  '{other, jam}',
  'Stores 4-6 months in a cool (32-35F) location. Excellent for applesauce and apple butter (slow cooker method). Can be dehydrated into apple chips. Makes a mild, sweet cider when pressed.',
  'Plant bare-root trees in late winter while dormant. Requires 400-600 chill hours (Zone 9a provides this). Needs a pollinator: plant with Granny Smith or another compatible variety. Prune annually in late winter. Thin fruit in June to 6 inches apart for larger apples.',
  true, NULL
),

-- 21. Granny Smith Apple
(
  'Apple', 'Granny Smith', 'fruit',
  'Tart, bright green apple that is the gold standard for baking. Firm flesh holds its shape when cooked. Also an excellent pollinator for Fuji and other varieties.',
  NULL, NULL, NULL,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Chives, nasturtium, comfrey, dill',
  'Walnut trees, grass directly around trunk',
  'Harvest late October to November when fruit is bright green and firm. Granny Smith is one of the latest apples to ripen. The longer it stays on the tree, the larger and slightly sweeter it gets, sometimes developing a pink blush.',
  '{other, jam}',
  'The best pie and baking apple. Stores 3-5 months. Excellent for apple butter (combine with Fuji for balanced sweetness). Slices can be canned in light syrup. Makes the best hard cider when blended with sweeter varieties.',
  'Low chill requirement (400 hours) makes it well-suited to Zone 9a/9b. Pollinates Fuji and vice versa; plant both for fruit production. Same care as Fuji: annual dormant pruning, June thinning, consistent watering during fruit development.',
  true, NULL
),

-- 22. Peach (Elberta)
(
  'Peach', 'Elberta', 'fruit',
  'Classic freestone peach with golden-yellow flesh and a red blush. Self-fertile, so no pollinator needed. The standard canning peach for over a century.',
  NULL, NULL, NULL,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Basil, tansy, garlic, nasturtium, comfrey',
  'Tomatoes, potatoes (share fungal diseases)',
  'Harvest when background color changes from green to yellow and fruit yields to gentle thumb pressure near the stem. Freestone pit separates easily from flesh. Tree-ripened peaches are far superior to store-bought.',
  '{canning, freezing, jam}',
  'The quintessential peach jam fruit. For jam: peel, pit, and crush; cook with sugar, lemon juice, and pectin; process in water bath (10 min half-pints). Halve and can in light syrup for winter cobblers. Slice and freeze on sheet pans for smoothies.',
  'Requires 800-900 chill hours; Zone 9a borderline (check your specific microclimate). If insufficient chill, consider a low-chill variety instead. Needs aggressive annual pruning to an open vase shape. Thin fruit to 6-8 inches apart in spring for large peaches. Leaf curl is common; apply dormant copper spray.',
  true, NULL
),

-- 23. Persimmon (Fuyu)
(
  'Persimmon', 'Fuyu', 'fruit',
  'Non-astringent Asian persimmon that can be eaten firm like an apple. Sweet, honey-like flavor. Beautiful ornamental tree with stunning orange fall foliage. Low maintenance.',
  NULL, NULL, NULL,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Comfrey, clover, garlic',
  'Walnut trees',
  'Harvest when fruit is fully orange and firm (non-astringent Fuyu can be eaten hard). For sweetest flavor, let soften slightly on the counter. Can also be left on the tree after leaves drop for dramatic effect and increased sweetness.',
  '{drying, freezing, jam}',
  'Slice firm fruit and dehydrate for persimmon chips (chewy, candy-like). Puree soft-ripe fruit and freeze for baking (persimmon cookies and bread). Persimmon jam or butter is a unique preserve worth making.',
  'One of the easiest fruit trees for Zone 9a. Needs only 100-200 chill hours. Self-fertile. Requires minimal pruning compared to other fruit trees. Virtually pest-free. Begins bearing in 3-4 years. Deep taproot makes it somewhat drought-tolerant once established.',
  true, NULL
),

-- ============================================================================
-- BERRIES
-- ============================================================================

-- 24. Blueberry (Highbush)
(
  'Blueberry', 'Highbush (Bluecrop)', 'berry',
  'Northern highbush blueberry with large, firm berries and excellent flavor. Grows 4-6 feet tall. Needs acidic soil (pH 4.5-5.5) and a cross-pollination partner for best yields.',
  NULL, NULL, 48,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Azaleas, rhododendrons, heather (share acid soil needs)',
  'Walnut trees, plants that raise soil pH',
  'Berries are ripe when they turn fully blue and detach easily with a gentle tug. Wait 3-5 days after turning blue for peak sweetness. Taste-test is the best method. Bird netting is essential or you will lose most of your crop.',
  '{freezing, jam}',
  'Freeze on sheet pans in single layers, then bag. Frozen blueberries are nearly as good as fresh for baking and smoothies. For jam: cook with sugar, lemon juice, and pectin; process in water bath (10 min half-pints). Blueberry-lavender jam is exceptional.',
  'Must have acidic soil. Amend with sulfur and peat moss before planting. Mulch with pine needles or acidic bark. Plant at least two different varieties for cross-pollination (pair with Rabbiteye). Water with rainwater if your tap water is alkaline.',
  true, NULL
),

-- 25. Blueberry (Rabbiteye)
(
  'Blueberry', 'Rabbiteye (Tifblue)', 'berry',
  'Southern blueberry variety naturally adapted to warmer climates. More heat and drought tolerant than highbush types. Vigorous grower to 6-10 feet. Slightly smaller berries with excellent flavor.',
  NULL, NULL, 60,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Azaleas, rhododendrons, other acid-loving plants',
  'Walnut trees, lime-loving plants',
  'Same as highbush: wait until fully blue and easy to detach. Rabbiteye varieties ripen later in the season, extending your blueberry harvest when paired with highbush. Net against birds.',
  '{freezing, jam}',
  'Same preserving methods as highbush. Rabbiteye berries have slightly thicker skins which hold up well in jam and baking. Excellent for dehydrating into dried blueberries.',
  'Better adapted to Zone 9a than many highbush varieties. Needs 300-600 chill hours. Still requires acidic soil but tolerates slightly higher pH than highbush. Plant at least two rabbiteye varieties or cross-pollinate with highbush. Less susceptible to root rot.',
  true, NULL
),

-- 26. Blackberry
(
  'Blackberry', 'Triple Crown (Thornless)', 'berry',
  'Thornless semi-erect blackberry with very large, sweet berries. Heavy producer. Much easier to manage and harvest than thorned varieties without sacrificing flavor.',
  NULL, NULL, 60,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Tansy, garlic, chives, marigolds',
  'Raspberries (share diseases; separate by 50+ feet), nightshades',
  'Ripe berries are fully black, slightly soft, and dull (not shiny). Shiny black berries are not yet ripe and will be tart. Berries do not ripen further after picking. Harvest every 2-3 days in peak season.',
  '{freezing, jam}',
  'Freeze on sheet pans, then bag for year-round smoothies and baking. For jam: cook with sugar and pectin (seeds can be strained out for seedless jam; use a food mill). Blackberry jam is one of the best single-fruit preserves. Also excellent in shrubs and syrups.',
  'Train on a trellis or fence. Prune out fruited canes after harvest (they die after fruiting). New canes grow each year for next year''s fruit. Tip-prune new canes at 4 feet to encourage branching. Self-fertile. Very productive once established.',
  true, NULL
),

-- 27. Raspberry
(
  'Raspberry', 'Heritage (Everbearing)', 'berry',
  'Red everbearing raspberry that produces two crops: a small summer crop on last year''s canes and a larger fall crop on new canes. Excellent flavor and good disease resistance.',
  NULL, NULL, 30,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -4, 2,
  NULL, NULL,
  'Garlic, tansy, marigolds, yarrow',
  'Blackberries (separate by 50+ feet), nightshades, strawberries',
  'Ripe raspberries pull easily from the white core (receptacle), leaving a hollow berry. If you have to tug, it is not ready. Harvest every 1-2 days; berries are extremely perishable. Eat or process within 24 hours.',
  '{freezing, jam}',
  'Freeze immediately after harvest on sheet pans; bag once frozen. Frozen raspberries are perfect for jam-making year-round. Raspberry jam: cook berries, strain half through a sieve to remove some seeds, add sugar and pectin. Also makes exceptional vinegar and shrubs.',
  'Spreads by underground runners; plant in a contained bed or use root barriers. For simplest management, mow all canes to ground in late winter and harvest only the fall crop. Self-fertile. Needs consistent moisture but good drainage.',
  true, NULL
),

-- 28. Strawberry
(
  'Strawberry', 'Chandler (June-bearing)', 'berry',
  'Large, sweet, deep red June-bearing strawberry developed for California. Excellent fresh flavor and good for preserving. Heavy producer in a concentrated spring season.',
  NULL, NULL, 12,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  -6, -2,
  NULL, NULL,
  'Beans, lettuce, onions, spinach, thyme, borage',
  'Brassicas, fennel, tomatoes, peppers',
  'Harvest when berries are fully red with no white tips. Pick with the green cap attached by pinching the stem. Harvest in the morning when berries are cool and firm. Do not wash until ready to eat.',
  '{freezing, jam}',
  'Hull and freeze on sheet pans for baking and smoothies. Classic strawberry jam: crush berries, cook with sugar, lemon juice, and pectin; process in water bath (10 min half-pints). Strawberry freezer jam preserves the brightest fresh flavor.',
  'Plant crowns in fall or very early spring in Zone 9a. Mulch with straw to keep fruit clean and soil cool. Remove runners the first year to build strong mother plants. Replace plants every 3-4 years as productivity declines. Bird netting helps.',
  true, NULL
),

-- ============================================================================
-- HERBS
-- ============================================================================

-- 29. Basil
(
  'Basil', 'Genovese', 'herb',
  'The classic Italian sweet basil with large, aromatic, slightly cupped leaves. Essential for pesto, Caprese salad, and any tomato dish. Grows vigorously in summer heat.',
  50, 70, 12,
  'full_sun', 'moderate', 'both',
  -6, -4,
  0, 2,
  0, 4,
  'Tomatoes, peppers, oregano, marigolds',
  'Sage, rue, common rue',
  'Harvest by pinching stems just above a leaf pair to encourage branching. Never remove more than a third of the plant at once. Pinch off flower buds immediately to keep leaves producing. Harvest in the morning for strongest flavor.',
  '{drying, freezing, other}',
  'Best preserved as pesto: blend with garlic, pine nuts, Parmesan, olive oil; freeze in ice cube trays. Dries less successfully than other herbs (loses flavor), but works in a dehydrator at low temp. Can also chiffonade and freeze in olive oil in ice cube trays.',
  'Cannot tolerate any frost; plant after last frost when nights are consistently above 50F. Pinch the main stem when plant is 6 inches tall to encourage bushiness. Succession-plant or grow several plants for enough pesto to freeze for winter.',
  true, NULL
),

-- 30. Cilantro
(
  'Cilantro', NULL, 'herb',
  'Cool-season herb with bright, citrusy leaves essential for salsa, guacamole, and Asian cuisine. Bolts quickly in heat, but the seeds (coriander) are also a valuable spice.',
  45, 60, 6,
  'partial_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -4, 2,
  'Beans, peas, tomatoes, peppers, lettuce',
  'Fennel, dill (cross-pollination)',
  'Harvest outer leaves when plants are 4-6 inches tall. Cut whole stems rather than individual leaves. Once flower stalks appear, leaves become sparse and bitter. Let some plants bolt and collect coriander seeds when brown and dry.',
  '{drying, freezing}',
  'Cilantro does not dry well (loses flavor completely). Freeze chopped leaves in ice cube trays with water or oil for cooking. Let bolted plants produce coriander seeds; dry and store as a spice. Coriander is essential in pickling spice blends.',
  'Bolts very quickly in heat. In Zone 9a, treat as a spring and fall crop. Succession-plant every 2 weeks from early spring. Slow-bolt varieties like Calypso help but will still bolt in summer. Self-sows freely if allowed to go to seed.',
  true, NULL
),

-- 31. Rosemary
(
  'Rosemary', NULL, 'herb',
  'Woody, evergreen Mediterranean herb with intensely aromatic needle-like leaves. Drought-tolerant once established. Grows into a beautiful, fragrant shrub.',
  90, 120, 24,
  'full_sun', 'low', 'transplant',
  -10, -8,
  -2, 4,
  NULL, NULL,
  'Sage, thyme, lavender, beans, carrots, cabbage',
  'Basil, mint (different water needs)',
  'Harvest by cutting sprigs from the tips of branches. Never cut into bare wood (it will not regrow). Harvest anytime; flavor is strongest just before flowering. Rosemary is evergreen in Zone 9a and can be harvested year-round.',
  '{drying}',
  'One of the best herbs for drying; retains flavor extremely well. Bundle stems and hang upside down in a warm, dry place for 1-2 weeks. Strip needles and store in airtight jars. Fresh rosemary can also be frozen in olive oil in ice cube trays.',
  'Treat as a perennial shrub in Zone 9a; it will survive winters easily and grow for many years. Needs excellent drainage; will die in waterlogged soil. Rarely needs fertilizer. Can be pruned into hedges or topiaries. Flowers attract pollinators.',
  true, NULL
),

-- 32. Thyme
(
  'Thyme', 'English', 'herb',
  'Low-growing perennial herb with tiny, intensely aromatic leaves. Essential in French cooking, soups, stews, and roasted meats. Attractive edging plant with purple flowers that bees love.',
  70, 90, 12,
  'full_sun', 'low', 'transplant',
  -10, -8,
  -2, 4,
  NULL, NULL,
  'Rosemary, sage, lavender, cabbage, tomatoes, strawberries',
  'Mint, basil (different water needs)',
  'Harvest sprigs by cutting stems before flowering for strongest flavor. Cut up to a third of the plant at a time. Thyme recovers quickly and can be harvested repeatedly through the growing season.',
  '{drying}',
  'Excellent for drying. Bundle small stems and hang, or lay on screens in a warm place. Tiny leaves fall off easily when dry; crumble and store. Thyme retains its flavor well when dried. Can also freeze sprigs directly.',
  'Perennial in Zone 9a; lives for several years. Needs excellent drainage and not much water once established. Trim back in early spring to prevent woody, leggy growth. Replace plants every 3-4 years when they become too woody.',
  true, NULL
),

-- 33. Oregano
(
  'Oregano', 'Greek', 'herb',
  'Robust perennial herb with pungent, slightly spicy flavor. Essential for Italian, Greek, and Mexican cooking. Greek oregano has the strongest flavor of any oregano variety.',
  80, 90, 12,
  'full_sun', 'low', 'transplant',
  -10, -8,
  -2, 4,
  NULL, NULL,
  'Tomatoes, peppers, basil, beans, squash',
  'Mint (will be overwhelmed by mint spreading)',
  'Harvest just before flowers open for peak essential oil content. Cut stems to about 2 inches above the ground. Plants will regrow for multiple harvests per season.',
  '{drying}',
  'One of the few herbs that is actually better dried than fresh. Hang bundles upside down for 1-2 weeks. Strip leaves and store whole; crush just before using for best flavor. Essential for pizza sauce and Italian herb blends.',
  'Hardy perennial in Zone 9a. Spreads moderately by runners. Needs minimal care once established. Trim back hard in early spring. Flowers attract beneficial pollinators and predatory wasps. Flavor is strongest in hot, dry conditions.',
  true, NULL
),

-- 34. Sage
(
  'Sage', 'Common Garden', 'herb',
  'Beautiful silvery-green perennial herb with velvety leaves and a warm, earthy, slightly peppery flavor. Essential for poultry seasoning, stuffing, and brown butter sauce.',
  75, 90, 24,
  'full_sun', 'low', 'transplant',
  -8, -6,
  -2, 4,
  NULL, NULL,
  'Rosemary, thyme, lavender, cabbage, carrots, tomatoes',
  'Cucumbers, basil, rue',
  'Harvest individual leaves or cut stems as needed. Best harvested before flowering. Light harvests can continue year-round in Zone 9a. Avoid heavy harvesting in the first year to let the plant establish.',
  '{drying}',
  'Dries beautifully. Lay leaves flat on screens or hang small bundles. Dried sage is traditional for Thanksgiving stuffing and sausage seasoning. Can also be fried in butter for a crispy garnish that freezes well.',
  'Woody perennial that lives 4-5 years in Zone 9a before becoming too woody and needing replacement. Needs excellent drainage. Attractive purple-blue flower spikes in spring. Prune lightly after flowering to maintain shape.',
  true, NULL
),

-- 35. Dill
(
  'Dill', 'Bouquet', 'herb',
  'Tall, feathery annual herb essential for pickles, fish, and Scandinavian cooking. Both leaves (dill weed) and seeds are culinary staples. Attracts swallowtail butterflies.',
  40, 60, 12,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -2, 6,
  'Lettuce, cucumbers, onions, cabbage',
  'Tomatoes, carrots (attracts carrot fly), fennel (cross-pollinates)',
  'Harvest dill weed (leaves) by snipping fronds before flowers open. For dill seed, let flower heads mature and turn brown; cut heads into a paper bag and shake to collect seeds. For pickles, use whole flower heads with immature green seeds.',
  '{drying}',
  'Dill weed loses flavor when dried; freeze fronds in ice cube trays with water for better preservation. Dill seed dries on the plant and stores well in jars. Fresh dill heads are essential for proper dill pickles; time your planting with your cucumber harvest.',
  'Direct sow in place; dill has a taproot and resents transplanting. Bolts quickly in heat. Succession-plant every 3 weeks and again in late summer. Self-sows readily; let some go to seed for next year. Time planting so flower heads are ready when pickling cucumbers are ready.',
  true, NULL
),

-- 36. Parsley
(
  'Parsley', 'Italian Flat-Leaf', 'herb',
  'Biennial herb with flat, deeply flavored leaves far superior to curly parsley for cooking. Foundation herb for chimichurri, tabbouleh, gremolata, and stock.',
  70, 80, 8,
  'partial_sun', 'moderate', 'both',
  -8, -6,
  -2, 2,
  -4, 4,
  'Tomatoes, corn, asparagus, roses',
  'Lettuce, mint',
  'Cut outer stems at the base, leaving the inner growth to continue producing. Parsley can be harvested continuously through the growing season. Flavor is best before the plant bolts in its second year.',
  '{drying, freezing}',
  'Chop and freeze in ice cube trays with water or oil; retains color and flavor well. Can also be dried (spread on screens) though flavor diminishes. Make and freeze chimichurri in small containers for grilled meats year-round.',
  'Slow to germinate (2-3 weeks). Soak seed overnight to speed germination. Biennial: produces leaves the first year, flowers and seeds the second year, then dies. In Zone 9a, may overwinter and provide early spring harvests before bolting.',
  true, NULL
),

-- 37. Mint
(
  'Mint', 'Spearmint', 'herb',
  'Vigorous spreading perennial with bright, sweet, cooling flavor. Essential for mojitos, mint tea, lamb dishes, and Middle Eastern cooking. Extremely easy to grow; the challenge is containing it.',
  60, 90, 18,
  'partial_shade', 'high', 'transplant',
  NULL, NULL,
  -2, 8,
  NULL, NULL,
  'Cabbage, tomatoes, peas',
  'Parsley, chamomile (everything, really; mint takes over)',
  'Harvest by cutting stems down to a leaf pair. Regular harvesting keeps plants bushy and prevents flowering. Cut back hard several times per season. Flavor is strongest just before flowering.',
  '{drying, freezing}',
  'Dries well: hang bundles or lay on screens. Dried mint makes excellent tea. Freeze leaves in ice cube trays with water for cocktails and cooking. Make mint simple syrup and refrigerate for weeks.',
  'ALWAYS grow mint in containers or a deeply buried pot to prevent it from taking over the entire garden. It spreads aggressively by underground runners. Perennial in Zone 9a; comes back stronger each year. Can grow in more shade than most herbs.',
  true, NULL
),

-- 38. Chives
(
  'Chives', NULL, 'herb',
  'Clump-forming perennial allium with mild onion-flavored hollow leaves and edible purple pom-pom flowers. One of the first herbs to emerge in spring. Extremely low-maintenance.',
  60, 90, 8,
  'full_sun', 'moderate', 'both',
  -8, -6,
  -4, 2,
  -4, 2,
  'Carrots, tomatoes, roses, grapes, apples',
  'Beans, peas (alliums inhibit legume growth)',
  'Snip leaves 2 inches above the soil with scissors. Harvest from the outside of the clump. Flowers are edible and make beautiful vinegar (steep purple blossoms in white wine vinegar for pink chive vinegar).',
  '{drying, freezing}',
  'Freeze-dry well: snip into small pieces and freeze flat in bags. Dried chives lose flavor; frozen is much better. Chive blossom vinegar is a simple, beautiful preserve: pack blossoms into a jar, cover with white wine vinegar, steep 2 weeks, strain.',
  'Hardy perennial that returns reliably year after year in Zone 9a. Divide clumps every 3-4 years when they become crowded. Deadhead flowers to prevent self-seeding (or let them naturalize). Deters aphids when planted near roses and fruit trees.',
  true, NULL
),

-- 39. Lavender
(
  'Lavender', 'English (Munstead)', 'herb',
  'Compact, fragrant evergreen perennial with silvery foliage and purple flower spikes. Culinary, medicinal, and ornamental. Munstead is one of the hardiest and most compact English lavenders.',
  90, 120, 18,
  'full_sun', 'low', 'transplant',
  -10, -8,
  -2, 4,
  NULL, NULL,
  'Rosemary, thyme, sage, roses, echinacea',
  'Mint, basil, impatiens (opposite moisture needs)',
  'Harvest flower spikes when about half the buds have opened for strongest fragrance. Cut stems long for drying. For culinary use, harvest buds just before opening. A second lighter bloom may occur if you deadhead promptly.',
  '{drying}',
  'Bundle stems and hang upside down for 2-3 weeks. Use dried buds in baked goods (lavender shortbread), steep for tea, make lavender sugar, or add to herbes de Provence blend. Pairs beautifully with blueberry in jam. Make sachets for linen closets.',
  'Needs excellent drainage above all else; amend heavy clay with gravel and sand. Do not mulch against the crown. In Zone 9a, lavender is fully perennial and evergreen. Do not overwater or over-fertilize. Prune after flowering but never into old bare wood.',
  true, NULL
),

-- ============================================================================
-- FLOWERS
-- ============================================================================

-- 40. Zinnia
(
  'Zinnia', 'Benary''s Giant Mix', 'flower',
  'Tall, robust cut flower zinnia in a spectacular range of colors. Long, strong stems are perfect for bouquets. Easy to grow and butterflies and hummingbirds love them.',
  60, 75, 12,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 6,
  'Tomatoes, peppers, beans, nasturtium, marigolds',
  NULL,
  'Cut stems when flowers are fully open, in the morning. Cut long stems; the plant will branch and produce more flowers. The more you cut, the more they bloom. For longest vase life, sear stem ends briefly in boiling water.',
  NULL, NULL,
  'One of the easiest flowers from seed. Direct sow after last frost when soil is warm. Powdery mildew is common in late summer; space plants well for air circulation. Deadhead spent flowers or cut regularly to keep blooms coming until frost.',
  true, NULL
),

-- 41. Sunflower
(
  'Sunflower', 'Mammoth Grey Stripe', 'flower',
  'Towering single-stem sunflower growing 8-12 feet tall with massive seed heads. Iconic garden plant that kids love growing. Seeds are edible and birds go wild for them.',
  70, 90, 24,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 6,
  'Corn, beans, cucumbers, squash, lettuce (shade)',
  'Potatoes, pole beans (compete for height)',
  'For seeds, let the flower head droop and the back turn brown and dry. Cut the head with 12 inches of stem when seeds are plump and the petals have fallen. Hang upside down in a dry place with a bag to catch seeds.',
  '{other}',
  'Rub dried seeds from the head, soak overnight in salted water, and roast at 300F for 30-40 minutes. Or leave heads out for birds as a winter bird feeder.',
  'Direct sow in place; sunflowers develop a deep taproot and do not transplant well. Stake tall varieties in windy areas. Succession-plant every 2-3 weeks for staggered blooms. Branching varieties (Pro Cut, Sunrich) produce multiple smaller blooms for cutting.',
  true, NULL
),

-- 42. Marigold
(
  'Marigold', 'French (Sparky Mix)', 'flower',
  'Compact, bushy annual with double blooms in gold, orange, and mahogany. Legendary companion plant that repels pests. Blooms from spring until hard frost without stopping.',
  50, 65, 8,
  'full_sun', 'low', 'both',
  -6, -4,
  0, 2,
  0, 6,
  'Tomatoes, peppers, beans, squash, cucumbers, roses',
  NULL,
  'Deadhead spent flowers regularly to encourage continuous blooming. For seed saving, let a few flower heads dry on the plant, then collect the long, thin seeds from the dried head.',
  NULL, NULL,
  'One of the most beneficial companion plants. French marigold roots exude a substance that repels root-knot nematodes. Interplant throughout the vegetable garden. Extremely heat-tolerant and drought-tolerant once established. Edible flowers (petals only).',
  true, NULL
),

-- 43. Cosmos
(
  'Cosmos', 'Sensation Mix', 'flower',
  'Tall, airy annual with delicate, daisy-like flowers in pink, white, and crimson on wispy foliage. Effortless beauty that dances in the breeze. Attracts butterflies and beneficial insects.',
  60, 80, 18,
  'full_sun', 'low', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 6,
  'Tomatoes, peppers, beans, marigolds',
  NULL,
  'Cut flowers for arrangements when buds are just beginning to open; they will continue opening in the vase. Deadhead regularly or cut frequently to keep blooms coming. Self-sows readily.',
  NULL, NULL,
  'Thrives in poor soil; too much fertilizer produces foliage at the expense of flowers. Direct sow after last frost. Can reach 4-5 feet tall; may need staking in windy areas. Self-sows aggressively; pull unwanted seedlings in spring. Excellent pollinator plant.',
  true, NULL
),

-- 44. Nasturtium
(
  'Nasturtium', 'Jewel Mix', 'flower',
  'Edible annual with round, lily-pad leaves and bright jewel-toned flowers. Peppery flavor enhances salads. Trailing and compact varieties available. Trap crop for aphids.',
  45, 60, 12,
  'full_sun', 'low', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 4,
  'Tomatoes, cucumbers, squash, beans, cabbage, apple trees',
  NULL,
  'Harvest flowers, leaves, and seed pods. All parts are edible with a peppery, watercress-like flavor. Flowers are most tender when just opened. Harvest unripe green seed pods for "poor man''s capers."',
  '{other}',
  'Pickle green seed pods in vinegar to make a caper substitute (brine in salt water overnight, then pack in vinegar with peppercorns). Flowers can be frozen in ice cubes for cocktails. Leaves make a peppery pesto.',
  'Prefers poor, lean soil; too much nitrogen produces all leaves and no flowers. Direct sow after frost; seeds are large and easy to handle. Excellent trap crop: aphids prefer nasturtiums over vegetables, drawing them away from your food crops.',
  true, NULL
),

-- 45. Echinacea
(
  'Echinacea', 'Purple Coneflower', 'flower',
  'Native perennial wildflower with striking purple-pink daisy-like petals around a spiny orange cone. Drought-tolerant once established. Medicinal herb used for immune support.',
  90, 120, 18,
  'full_sun', 'low', 'both',
  -8, -6,
  -2, 2,
  -2, 4,
  'Lavender, black-eyed Susan, bee balm, rudbeckia',
  NULL,
  'For flowers, deadhead to encourage rebloom or leave seed heads for birds and winter interest. For medicinal use, harvest roots of 3+ year-old plants in fall after the plant goes dormant. Dry root pieces thoroughly.',
  '{drying}',
  'Dry flower petals and roots for immune-support tea blends. Tincture fresh or dried root in alcohol for cold and flu season. Leave seed heads standing through winter for goldfinches.',
  'Native prairie plant that thrives with neglect in Zone 9a. Perennial that improves each year for 5+ years. Attracts butterflies, bees, and beneficial insects. Do not over-fertilize or overwater. Self-sows gently. First-year plants may not bloom.',
  true, NULL
),

-- 46. Black-Eyed Susan
(
  'Black-Eyed Susan', 'Goldsturm', 'flower',
  'Cheerful native perennial with golden-yellow petals around a dark chocolate-brown center cone. Blooms profusely in late summer when many other flowers are fading. Tough and reliable.',
  90, 120, 18,
  'full_sun', 'low', 'both',
  -8, -6,
  -2, 2,
  -2, 2,
  'Echinacea, lavender, ornamental grasses, asters',
  NULL,
  'Deadhead spent flowers to extend blooming, or leave seed heads for birds. Cut back foliage after it dies back in late fall or leave for winter interest. Divide clumps every 3-4 years in spring.',
  NULL, NULL,
  'Native perennial that is extremely heat and drought tolerant once established. Perfect for Zone 9a. Blooms July through September, filling the gap between spring and fall flowers. Spreads by rhizomes into nice clumps. Goldfinches eat the seeds.',
  true, NULL
),

-- 47. Dahlia
(
  'Dahlia', 'Dinner Plate Mix', 'flower',
  'Spectacular tuberous perennial producing enormous, intricately layered blooms 8-12 inches across. Stunning cut flowers in a huge range of colors. The showstopper of any garden.',
  90, 120, 24,
  'full_sun', 'moderate', 'transplant',
  NULL, NULL,
  2, 4,
  NULL, NULL,
  'Marigolds, zinnias, sunflowers',
  NULL,
  'Cut stems in the morning when blooms are about 3/4 open. Plunge immediately into hot water (not boiling) for 30 seconds, then into cool water. This extends vase life significantly. Disbud (remove side buds) for the largest dinner plate blooms.',
  NULL, NULL,
  'Plant tubers after last frost when soil is warm (60F+). In Zone 9a, tubers can usually overwinter in the ground with heavy mulch, but digging and storing is safer. Stake tall varieties at planting time. Pinch the center growing tip when plants are 12 inches tall for bushier plants with more blooms.',
  true, NULL
),

-- ============================================================================
-- ADDITIONAL VEGETABLES (to reach ~55-60 total)
-- ============================================================================

-- 48. Pumpkin
(
  'Pumpkin', 'Sugar Pie', 'vegetable',
  'Small, sweet-fleshed pie pumpkin perfect for baking. Dense, smooth flesh makes the best homemade pumpkin puree. Compact enough for smaller gardens compared to jack-o-lantern types.',
  100, 115, 48,
  'full_sun', 'moderate', 'both',
  -3, -2,
  0, 2,
  0, 4,
  'Corn, beans, radishes, marigolds, nasturtium',
  'Potatoes, other squash nearby (cross-pollination)',
  'Harvest when skin is deep, uniform orange and resists puncture from a fingernail. Cut stem with a sharp knife leaving 4 inches of stem attached (broken stems invite rot). Cure in sun for 10 days before storing.',
  '{canning, freezing}',
  'Roast halved pumpkins at 375F until tender, scoop flesh, and puree. Freeze in 15-oz portions (equivalent to one can) for pies and baking. Can pressure-can cubed pumpkin (not pureed) for shelf-stable storage. Makes excellent pumpkin butter.',
  'Needs a long, warm season. Direct sow or transplant after last frost. Each plant needs significant space (6-8 feet of vine). Can be grown vertically on a strong trellis with slings supporting the fruit. Hand-pollinate if bee activity is low.',
  true, NULL
),

-- 49. Bell Pepper
(
  'Bell Pepper', 'California Wonder', 'vegetable',
  'Classic thick-walled bell pepper that starts green and ripens to red. Sweet, crunchy flesh is versatile raw and cooked. Red stage has twice the vitamin C and more sweetness.',
  65, 80, 18,
  'full_sun', 'moderate', 'transplant',
  -10, -8,
  0, 4,
  NULL, NULL,
  'Basil, tomatoes, carrots, onions, parsley',
  'Fennel, brassicas',
  'Harvest green peppers anytime they reach full size, or leave on the plant to ripen to red for sweeter flavor (takes 2-3 additional weeks). Cut stems with pruners rather than pulling to avoid breaking branches.',
  '{freezing, canning}',
  'Dice and freeze raw on sheet pans for cooking (no need to blanch). Roast, peel, and freeze or can in olive oil. Excellent in pepper relish or chutney. Stuffed peppers freeze well fully assembled.',
  'Peppers need consistently warm soil and air. In Zone 9a, wait until nighttime temps are reliably above 55F. Cool nights cause blossom drop. Side-dress with calcium to prevent blossom end rot. Provide afternoon shade if temps exceed 95F.',
  true, NULL
),

-- 50. Butternut Squash
(
  'Butternut Squash', 'Waltham', 'vegetable',
  'Classic tan-skinned winter squash with sweet, nutty orange flesh. Stores for months. One of the most versatile and reliable winter squash varieties for cooking and storage.',
  85, 110, 48,
  'full_sun', 'moderate', 'both',
  -3, -2,
  0, 2,
  0, 4,
  'Corn, beans, radishes, marigolds, nasturtium',
  'Potatoes',
  'Harvest when skin is uniformly tan, stem is dry and corky, and skin cannot be dented with a thumbnail. Cut with a sharp knife leaving 2-3 inches of stem. Cure in a warm (80F), dry place for 2 weeks before storage.',
  '{freezing, canning}',
  'Roast, scoop, and freeze puree in portions for soups and baking. Pressure-can cubed squash for shelf-stable storage. Butternut keeps 3-6 months in a cool (50-55F), dry room without any processing.',
  'Needs a long warm season (85-110 days). Vines spread 10-15 feet; plan accordingly or train up a sturdy trellis. Very productive; 2-3 plants produce more squash than most families can eat. Powdery mildew is common late season but does not affect stored fruit quality.',
  true, NULL
),

-- 51. Spinach
(
  'Spinach', 'Bloomsdale Long Standing', 'vegetable',
  'Cool-season green with thick, savoyed (crinkled) dark green leaves. Bloomsdale Long Standing is a slow-bolt variety, extending the harvest window. Rich in iron and nutrients.',
  37, 50, 6,
  'partial_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -6, 0,
  'Strawberries, peas, beans, cabbage, celery',
  'Potatoes',
  'Harvest outer leaves when they reach 3-4 inches for baby spinach, or wait for full-size leaves. Cut-and-come-again: harvest outer leaves and let center continue growing. Harvest the entire plant before bolting if the weather turns hot.',
  '{freezing}',
  'Blanch for 1 minute, shock in ice water, squeeze out excess water, and freeze in measured portions. Frozen spinach is excellent in soups, pasta, dips, and smoothies. Does not dry or can well.',
  'Cool-season crop that bolts quickly in heat. In Zone 9a, spinach is best as an early spring or fall/winter crop. Can be planted in fall and harvested through the mild winter. Row cover extends the season in both directions.',
  true, NULL
),

-- 52. Swiss Chard
(
  'Swiss Chard', 'Rainbow Mix', 'vegetable',
  'Beautiful and productive green with colorful stems in red, orange, yellow, pink, and white. Heat-tolerant alternative to spinach that produces all season. Both leaves and stems are edible.',
  50, 60, 12,
  'partial_sun', 'moderate', 'both',
  -4, -2,
  -2, 2,
  -2, 6,
  'Beans, cabbage, lettuce, onions',
  'Corn, potatoes, melons',
  'Harvest outer stalks by cutting at the base, leaving the center to continue producing. Can be harvested continuously for months. Young leaves are tender for salads; mature leaves are better cooked. Stems and leaves can be cooked separately.',
  '{freezing}',
  'Blanch and freeze like spinach. Stems can be pickled or fermented separately (they have a mild, beet-like flavor). Sauteed chard with garlic freezes well for quick side dishes.',
  'One of the most productive and long-lasting greens in the garden. Handles both heat and light frost. In Zone 9a, can produce from spring through fall with minimal care. Ornamental enough for flower beds. Rainbow varieties are stunning.',
  true, NULL
),

-- 53. Garlic
(
  'Garlic', 'Softneck (California White)', 'vegetable',
  'Kitchen essential that grows easily from individual cloves planted in fall. Softneck varieties store the longest and are best for braiding. California White is well-adapted to mild winter areas.',
  150, 180, 6,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  NULL, NULL,
  'Tomatoes, peppers, beets, carrots, lettuce, strawberries, roses',
  'Beans, peas (alliums inhibit legume growth)',
  'Harvest when lower 3-4 leaves have browned but upper leaves are still green (usually late June/July). Loosen soil with a fork and pull carefully. Do not wait until all leaves brown or bulbs may split in the ground.',
  '{drying, other}',
  'Cure by hanging in a warm, dry, airy place for 3-4 weeks until outer skins are papery and necks are completely dry. Braid softneck varieties for attractive kitchen storage. Stores 6-9 months in a cool, dry place. Roast heads, squeeze, and freeze paste.',
  'Plant individual cloves in October/November in Zone 9a, pointy end up, 2 inches deep. Mulch heavily. Garlic needs a cold period to form bulbs. Softneck is recommended for Zone 9 as it requires less cold than hardneck. Scapes do not form on softneck.',
  true, NULL
),

-- 54. Onion
(
  'Onion', 'Yellow (Granex/Vidalia type)', 'vegetable',
  'Sweet, mild short-day onion suited to Zone 9. Large, flattened bulbs with mild flavor for fresh eating. Short-day varieties are essential for southern and mild-winter gardens.',
  90, 120, 6,
  'full_sun', 'moderate', 'both',
  -10, -8,
  -4, -2,
  -4, 0,
  'Carrots, lettuce, beets, tomatoes, peppers, strawberries',
  'Beans, peas (alliums inhibit legumes)',
  'Harvest when tops fall over naturally. Let them lie in the field for a day, then cure in a warm, airy place for 2-3 weeks. Sweet onions do not store as long as storage onions; use within 1-2 months or refrigerate.',
  '{other}',
  'Sweet onions have high water content and do not store long-term. Dice and freeze for cooking. Caramelize in bulk and freeze in portions. Can be pickled or made into onion jam. For long storage, grow a storage variety instead.',
  'Short-day onion varieties are essential for Zone 9a (they form bulbs when day length reaches 10-12 hours). Plant sets or transplants in late winter. Long-day varieties will NOT form bulbs this far south. Consistent watering during bulb formation is critical.',
  true, NULL
),

-- 55. Snap Peas
(
  'Snap Peas', 'Sugar Snap', 'vegetable',
  'Sweet, edible-podded pea with thick, crunchy walls and tender peas inside. Best eaten fresh off the vine. Climbs 5-6 feet and fixes nitrogen in the soil.',
  60, 70, 4,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -6, -2,
  'Carrots, radishes, turnips, cucumbers, corn, beans',
  'Onions, garlic, leeks (alliums inhibit peas)',
  'Harvest when pods are plump and round, with peas visible through the pod wall, but before they become starchy. Snap a pod in half; it should be crisp and juicy. Pick every 1-2 days for peak sweetness and to encourage production.',
  '{freezing}',
  'Blanch for 1 minute, shock in ice water, and freeze. Best eaten fresh, but frozen snap peas work in stir-fries. Can also be quick-pickled with rice vinegar and chili flakes for a tangy snack.',
  'Cool-season crop; plant as early as the soil can be worked in spring. In Zone 9a, also excellent as a fall/winter crop planted in September. Needs a trellis or fence to climb. Inoculate seeds with rhizobium for better nitrogen fixation. Heat ends production.',
  true, NULL
),

-- 56. Beets
(
  'Beets', 'Detroit Dark Red', 'vegetable',
  'Classic deep red beet with sweet, earthy flavor and smooth, round roots. Both roots and greens are edible. Greens are as nutritious as Swiss chard and should not be wasted.',
  50, 65, 4,
  'full_sun', 'moderate', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  -4, 6,
  'Lettuce, onions, garlic, cabbage, bush beans',
  'Pole beans, mustard, charlock',
  'Harvest roots at 2-3 inches diameter for most tender texture. Larger beets become woody. Twist off greens (don''t cut) leaving 1 inch of stem to prevent bleeding during cooking. Greens can be harvested earlier as a separate crop.',
  '{canning, fermenting, freezing}',
  'Roast, peel, and freeze cubed beets for winter salads. Pressure-can in cubes. Ferment raw, shredded beets for probiotic beet kvass. Classic pickled beets: roast, slice, pack with vinegar, sugar, and spices, process in water bath.',
  'Each beet "seed" is actually a cluster of 2-4 seeds; thin to 4 inches apart when seedlings are 2 inches tall. Soak seed clusters in water for 2 hours before planting to speed germination. Succession-plant every 3 weeks. Cool-season crop but handles Zone 9a summers if watered.',
  true, NULL
),

-- 57. Corn
(
  'Corn', 'Golden Bantam (Sweet)', 'vegetable',
  'Open-pollinated heirloom sweet corn with old-fashioned corn flavor. Golden-yellow ears with tender, sweet kernels. Not as sugary as modern hybrids but far more corny and complex in taste.',
  70, 85, 12,
  'full_sun', 'high', 'direct_sow',
  NULL, NULL,
  NULL, NULL,
  0, 6,
  'Beans, squash, pumpkins, cucumbers, melons (Three Sisters)',
  'Tomatoes (both heavy feeders), celery',
  'Harvest when silks are brown and dry, kernels are plump, and a punctured kernel releases milky (not clear) juice. Pull ears downward and twist to detach. Cook or process immediately; sugar converts to starch rapidly after picking.',
  '{freezing}',
  'Blanch ears 4 minutes, cut kernels off the cob, and freeze flat in bags. Open-pollinated corn also makes excellent cornmeal: let ears dry fully on the stalk, shell, and grind. Freeze to prevent rancidity.',
  'Must be planted in blocks of at least 4 rows (not single rows) for wind pollination. Heavy feeder; amend soil generously with compost. Plant with the Three Sisters (corn, beans, squash) for companion benefits. Each stalk produces 1-2 ears.',
  true, NULL
);
