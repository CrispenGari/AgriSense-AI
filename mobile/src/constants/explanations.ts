export const CLASS_EXPLANATIONS = {
  Plant_Identification: {
    Cashew: {
      label: "Cashew",
      type: "crop",
      crop: "Cashew",
      meaning:
        "The image is predicted to belong to a cashew plant. Cashew is a tree crop commonly grown for its nuts and cashew apples.",
      appInsight:
        "After identifying the crop as Cashew, AgriSense AI routes the image to the Cashew disease detection model.",
      whatToCheck:
        "Inspect young leaves, older leaves, shoots, flowers, and nuts for spots, rust-like patches, mining trails, gumming, or dieback.",
      goodPractices: [
        "Use healthy planting material.",
        "Keep orchards clean by removing infected leaves, dead shoots, and plant debris.",
        "Improve airflow through proper spacing and pruning.",
        "Monitor leaves regularly during humid or rainy periods.",
        "Consult local extension officers before applying fungicides or insecticides.",
      ],
      nextModel: "Cashew MobileNetV3",
    },

    Cassava: {
      label: "Cassava",
      type: "crop",
      crop: "Cassava",
      meaning:
        "The image is predicted to belong to a cassava plant. Cassava is a root crop widely grown for food security and starch production.",
      appInsight:
        "After identifying the crop as Cassava, AgriSense AI routes the image to the Cassava disease detection model.",
      whatToCheck:
        "Inspect leaves and stems for mosaic patterns, brown spots, yellowing, mite damage, wilting, blight lesions, or stunted growth.",
      goodPractices: [
        "Plant disease-free stem cuttings.",
        "Use tolerant or resistant cassava varieties where available.",
        "Remove and destroy visibly infected plants early.",
        "Clean tools used for cutting planting material.",
        "Avoid planting near fields with severe cassava disease pressure.",
      ],
      nextModel: "Cassava MobileNetV3",
    },

    Maize: {
      label: "Maize",
      type: "crop",
      crop: "Maize",
      meaning:
        "The image is predicted to belong to a maize plant. Maize is a major cereal crop grown for food, feed, and industrial use.",
      appInsight:
        "After identifying the crop as Maize, AgriSense AI routes the image to the Maize disease and pest detection model.",
      whatToCheck:
        "Inspect leaves, whorls, stems, and lower canopy for feeding holes, streaks, long lesions, leaf spots, beetle damage, or armyworm frass.",
      goodPractices: [
        "Scout fields regularly, especially during early growth stages.",
        "Rotate maize with non-maize crops where possible.",
        "Use resistant or tolerant varieties when available.",
        "Manage crop residues that may carry disease organisms.",
        "Use integrated pest management before considering chemical control.",
      ],
      nextModel: "Maize MobileNetV3",
    },

    Tomato: {
      label: "Tomato",
      type: "crop",
      crop: "Tomato",
      meaning:
        "The image is predicted to belong to a tomato plant. Tomato is a vegetable crop that is sensitive to leaf diseases, viral infections, and soil-borne wilts.",
      appInsight:
        "After identifying the crop as Tomato, AgriSense AI routes the image to the Tomato disease detection model.",
      whatToCheck:
        "Inspect lower and upper leaves for blight lesions, curling, yellowing, circular spots, wilting, and uneven plant growth.",
      goodPractices: [
        "Use disease-free seedlings.",
        "Stake plants and improve airflow.",
        "Avoid overhead watering where possible.",
        "Remove infected leaves and crop debris.",
        "Rotate tomato with non-host crops.",
        "Control whiteflies and other insect vectors early.",
      ],
      nextModel: "Tomato MobileNetV3",
    },
  },

  Cashew: {
    anthracnose: {
      label: "anthracnose",
      displayName: "Anthracnose",
      type: "disease",
      crop: "Cashew",
      meaning:
        "Anthracnose is a fungal disease that can affect cashew leaves, shoots, flowers, and nuts. It is often favored by warm and humid conditions.",
      visibleSigns: [
        "Dark or reddish-brown spots on leaves.",
        "Lesions on young shoots or panicles.",
        "Dieback of tender shoots.",
        "Infected flowers or fruits may dry, rot, or drop.",
      ],
      possibleCauses: [
        "Fungal infection, commonly associated with Colletotrichum species.",
        "High humidity and rainy conditions.",
        "Infected plant debris or carry-over infection from previous seasons.",
      ],
      possibleSolutions: [
        "Remove and destroy infected leaves, shoots, and plant debris.",
        "Prune trees to improve airflow and reduce humidity inside the canopy.",
        "Avoid overhead irrigation where possible.",
        "Use resistant or tolerant cashew varieties where available.",
        "Apply locally approved fungicides only when necessary and according to label instructions.",
      ],
      prevention: [
        "Keep orchards clean.",
        "Monitor during rainy or humid periods.",
        "Disinfect pruning tools after working on infected trees.",
      ],
      appMessage:
        "The model detected symptoms consistent with cashew anthracnose. Inspect the tree for spreading lesions and consider orchard sanitation and expert advice.",
    },

    gumosis: {
      label: "gumosis",
      displayName: "Gummosis",
      type: "disease",
      crop: "Cashew",
      meaning:
        "Gummosis is a disease condition where gum or resin-like material exudes from infected or damaged plant tissues. In cashew, it can affect stems, branches, or other woody parts.",
      visibleSigns: [
        "Gum exudation from stems or branches.",
        "Cracks, cankers, or darkened bark areas.",
        "Branch weakening or dieback in severe cases.",
      ],
      possibleCauses: [
        "Fungal infection.",
        "Wounds caused by pruning, insects, or mechanical injury.",
        "Poor orchard sanitation and stressed trees.",
      ],
      possibleSolutions: [
        "Prune and remove severely affected branches.",
        "Avoid unnecessary injuries to stems and branches.",
        "Disinfect tools before and after pruning.",
        "Improve tree vigor through balanced nutrition and water management.",
        "Seek local extension advice for approved fungicide or wound treatment options.",
      ],
      prevention: [
        "Avoid damaging trunks and branches.",
        "Control insect pests that create entry wounds.",
        "Keep orchards clean and well managed.",
      ],
      appMessage:
        "The model detected symptoms consistent with cashew gummosis. Check stems and branches for gum exudation and cankers.",
    },

    healthy: {
      label: "healthy",
      displayName: "Healthy",
      type: "healthy",
      crop: "Cashew",
      meaning:
        "The cashew leaf appears visually healthy based on the classes known by the model.",
      visibleSigns: [
        "Normal green leaf color.",
        "No major spots, mining trails, rust patches, or necrotic lesions visible.",
        "No obvious pest or disease symptoms detected.",
      ],
      possibleSolutions: [],
      prevention: [
        "Continue regular scouting.",
        "Maintain orchard hygiene.",
        "Use balanced fertilization and proper pruning.",
        "Monitor during humid seasons when fungal diseases may increase.",
      ],
      appMessage:
        "The model classified this cashew sample as healthy. Continue monitoring because early symptoms may not always be visible.",
    },

    "leaf miner": {
      label: "leaf miner",
      displayName: "Leaf miner damage",
      type: "pest",
      crop: "Cashew",
      meaning:
        "Leaf miner damage is caused by insect larvae that feed inside leaf tissue, creating visible trails or blotches.",
      visibleSigns: [
        "Winding or irregular trails on leaves.",
        "Whitish, brown, or dry mined areas.",
        "Leaf distortion or drying in severe cases.",
      ],
      possibleCauses: [
        "Leaf miner larvae feeding between the upper and lower leaf surfaces.",
        "Poor pest monitoring.",
        "High pest pressure in the orchard.",
      ],
      possibleSolutions: [
        "Remove heavily infested leaves where practical.",
        "Use sticky traps to monitor adult activity.",
        "Conserve natural enemies such as parasitoid wasps where available.",
        "Avoid unnecessary broad-spectrum insecticides that may kill beneficial insects.",
        "Use locally approved pest control products only when infestation is severe.",
      ],
      prevention: [
        "Scout leaves regularly.",
        "Encourage natural biological control.",
        "Avoid excessive nitrogen fertilization that encourages tender growth.",
      ],
      appMessage:
        "The model detected symptoms consistent with cashew leaf miner damage. Inspect leaves for tunnels or blotches caused by larvae.",
    },

    "red rust": {
      label: "red rust",
      displayName: "Red rust / algal leaf spot",
      type: "disease",
      crop: "Cashew",
      meaning:
        "Red rust, also called algal leaf spot in many crops, appears as rusty orange to brown patches on leaves and may reduce leaf function when severe.",
      visibleSigns: [
        "Orange, reddish, or brown raised patches on leaves.",
        "Rough or velvety spots on the leaf surface.",
        "Reduced leaf quality in severe infections.",
      ],
      possibleCauses: [
        "Algal infection commonly associated with humid conditions.",
        "Dense canopy and poor airflow.",
        "Long periods of leaf wetness.",
      ],
      possibleSolutions: [
        "Prune trees to improve airflow.",
        "Remove heavily infected leaves where practical.",
        "Reduce prolonged leaf wetness.",
        "Improve tree nutrition and reduce plant stress.",
        "Use locally recommended copper-based products only when advised by extension services.",
      ],
      prevention: [
        "Maintain open canopy structure.",
        "Avoid overcrowding.",
        "Monitor during wet or humid periods.",
      ],
      appMessage:
        "The model detected symptoms consistent with cashew red rust or algal leaf spot. Check for rusty orange patches on leaves.",
    },
  },

  Cassava: {
    "bacterial blight": {
      label: "bacterial blight",
      displayName: "Cassava bacterial blight",
      type: "disease",
      crop: "Cassava",
      meaning:
        "Cassava bacterial blight is a serious bacterial disease that can affect leaves, stems, and shoots. It may cause leaf spots, wilting, dieback, and plant weakening.",
      visibleSigns: [
        "Angular brown or black leaf lesions.",
        "Water-soaked spots on leaves.",
        "Wilting of young shoots.",
        "Tip dieback.",
        "Gum exudation on stems or petioles in some cases.",
      ],
      possibleCauses: [
        "Bacterial infection spread through infected cuttings.",
        "Contaminated tools.",
        "Rain splash and movement through infected fields.",
      ],
      possibleSolutions: [
        "Use clean, disease-free stem cuttings.",
        "Remove and destroy severely infected plants.",
        "Disinfect tools used for cutting stems.",
        "Avoid moving planting material from infected fields.",
        "Use tolerant or resistant varieties where available.",
      ],
      prevention: [
        "Inspect planting material before use.",
        "Monitor fields weekly after sprouting.",
        "Destroy diseased crop residues after harvest.",
      ],
      appMessage:
        "The model detected symptoms consistent with cassava bacterial blight. Check for angular lesions, wilting, and dieback.",
    },

    "brown spot": {
      label: "brown spot",
      displayName: "Brown leaf spot",
      type: "disease",
      crop: "Cassava",
      meaning:
        "Brown leaf spot is a fungal leaf disease of cassava that causes brown lesions and can lead to yellowing, drying, and leaf drop.",
      visibleSigns: [
        "Small brown spots on leaves.",
        "Dark borders around spots.",
        "Yellowing around infected areas.",
        "Drying or blighting of affected leaves.",
      ],
      possibleCauses: [
        "Fungal infection surviving on infected leaves.",
        "Spread from infected cassava debris.",
        "Humid conditions that favor fungal growth.",
      ],
      possibleSolutions: [
        "Remove and destroy infected leaves where practical.",
        "Use clean planting material.",
        "Improve spacing to increase airflow.",
        "Avoid leaving infected leaf debris in the field.",
        "Use locally recommended fungicides only when necessary and according to label instructions.",
      ],
      prevention: [
        "Plant tolerant varieties where available.",
        "Practice field sanitation.",
        "Rotate or separate plantings where possible.",
      ],
      appMessage:
        "The model detected symptoms consistent with cassava brown leaf spot. Inspect for brown spots with dark margins.",
    },

    "green mite": {
      label: "green mite",
      displayName: "Cassava green mite damage",
      type: "pest",
      crop: "Cassava",
      meaning:
        "Cassava green mite is a pest that feeds on cassava leaves, especially during dry periods. Severe infestations can reduce plant vigor and root yield.",
      visibleSigns: [
        "Small yellow spots on leaves.",
        "Mottling or chlorosis.",
        "Curling or deformation of young leaves.",
        "Stunted shoot tips in severe attacks.",
        "Drying and leaf drop under heavy infestation.",
      ],
      possibleCauses: [
        "Mite feeding on leaf tissue.",
        "Dry season conditions.",
        "Movement of infested planting material.",
      ],
      possibleSolutions: [
        "Destroy heavily infested stems after harvest.",
        "Use clean planting material.",
        "Encourage natural enemies where available.",
        "Avoid unnecessary pesticide use that may kill beneficial mites or insects.",
        "Use resistant or tolerant varieties where available.",
      ],
      prevention: [
        "Inspect young leaves regularly during dry periods.",
        "Avoid planting infested stems.",
        "Maintain plant vigor through good agronomic practices.",
      ],
      appMessage:
        "The model detected symptoms consistent with cassava green mite damage. Check young leaves for yellow speckling, curling, or deformation.",
    },

    healthy: {
      label: "healthy",
      displayName: "Healthy",
      type: "healthy",
      crop: "Cassava",
      meaning:
        "The cassava leaf appears visually healthy based on the classes known by the model.",
      visibleSigns: [
        "Normal green leaf color.",
        "No clear mosaic, brown spots, mite damage, or blight symptoms visible.",
      ],
      possibleSolutions: [],
      prevention: [
        "Continue field monitoring.",
        "Use clean planting material.",
        "Remove infected plants early if symptoms later appear.",
        "Maintain proper spacing and field sanitation.",
      ],
      appMessage:
        "The model classified this cassava sample as healthy. Continue monitoring because early symptoms may not always be visible.",
    },

    mosaic: {
      label: "mosaic",
      displayName: "Cassava mosaic disease",
      type: "disease",
      crop: "Cassava",
      meaning:
        "Cassava mosaic disease is a viral disease that causes mosaic-like discoloration and leaf deformation. It can reduce plant growth and root yield.",
      visibleSigns: [
        "Patchy light and dark green mosaic patterns.",
        "Leaf distortion or twisting.",
        "Reduced leaf size.",
        "Stunted plant growth.",
        "Poor root development in severe cases.",
      ],
      possibleCauses: [
        "Cassava mosaic viruses.",
        "Infected stem cuttings.",
        "Spread by whiteflies.",
      ],
      possibleSolutions: [
        "Remove and destroy infected plants early.",
        "Use certified disease-free cuttings.",
        "Plant resistant or tolerant cassava varieties where available.",
        "Control whitefly populations through integrated pest management.",
        "Avoid planting near heavily infected cassava fields.",
      ],
      prevention: [
        "Select planting material from healthy plants.",
        "Monitor fields soon after sprouting.",
        "Rogue infected plants early.",
        "Maintain field sanitation.",
      ],
      appMessage:
        "The model detected symptoms consistent with cassava mosaic disease. Check for mosaic discoloration, leaf distortion, and stunting.",
    },
  },

  Maize: {
    "fall armyworm": {
      label: "fall armyworm",
      displayName: "Fall armyworm damage",
      type: "pest",
      crop: "Maize",
      meaning:
        "Fall armyworm is an insect pest whose larvae feed on maize leaves and whorls. It can cause serious damage if not detected early.",
      visibleSigns: [
        "Small pin holes on leaves.",
        "Window-pane feeding marks.",
        "Ragged leaf damage.",
        "Fresh frass inside the whorl.",
        "Defoliation in severe cases.",
      ],
      possibleCauses: [
        "Feeding by fall armyworm larvae.",
        "Late field scouting.",
        "High pest pressure during maize growth.",
      ],
      possibleSolutions: [
        "Scout fields regularly, especially young maize plants.",
        "Check the whorl for larvae and frass.",
        "Use hand removal where practical in small plots.",
        "Encourage natural enemies where possible.",
        "Use locally approved biological or chemical control only when infestation reaches action levels.",
      ],
      prevention: [
        "Monitor early and frequently.",
        "Use integrated pest management.",
        "Avoid unnecessary pesticide use.",
        "Coordinate monitoring with nearby farmers where possible.",
      ],
      appMessage:
        "The model detected symptoms consistent with fall armyworm damage. Inspect the maize whorl for larvae and fresh frass.",
    },

    grasshoper: {
      label: "grasshoper",
      displayName: "Grasshopper damage",
      type: "pest",
      crop: "Maize",
      meaning:
        "Grasshopper damage occurs when grasshoppers chew maize leaves, causing irregular feeding marks and reduced leaf area.",
      visibleSigns: [
        "Chewed leaf edges.",
        "Irregular holes on leaves.",
        "Skeletonized or torn leaf tissue.",
        "Visible grasshoppers in the field.",
      ],
      possibleCauses: [
        "Grasshopper feeding.",
        "Nearby grassy areas or weeds serving as pest habitat.",
        "Dry conditions that may increase grasshopper movement into crops.",
      ],
      possibleSolutions: [
        "Scout field edges and weedy areas.",
        "Control weeds around fields.",
        "Encourage birds and natural predators where possible.",
        "Use locally approved insect control only when damage is severe.",
      ],
      prevention: [
        "Keep field borders clean.",
        "Monitor early crop stages.",
        "Avoid unnecessary pesticide use that harms beneficial organisms.",
      ],
      appMessage:
        "The model detected symptoms consistent with grasshopper feeding damage. Check for irregular chewing and active insects.",
    },

    healthy: {
      label: "healthy",
      displayName: "Healthy",
      type: "healthy",
      crop: "Maize",
      meaning:
        "The maize leaf appears visually healthy based on the classes known by the model.",
      visibleSigns: [
        "Normal green color.",
        "No clear holes, streaks, blight lesions, or leaf spots visible.",
      ],
      possibleSolutions: [],
      prevention: [
        "Continue regular scouting.",
        "Monitor for pests during early growth.",
        "Use good soil fertility and water management.",
        "Rotate crops where possible.",
      ],
      appMessage:
        "The model classified this maize sample as healthy. Continue monitoring because early disease or pest symptoms may not always be visible.",
    },

    "leaf beetle": {
      label: "leaf beetle",
      displayName: "Leaf beetle damage",
      type: "pest",
      crop: "Maize",
      meaning:
        "Leaf beetle damage occurs when beetles feed on maize leaves. Some leaf beetles may also damage seedlings or contribute to plant stress.",
      visibleSigns: [
        "Chewed leaf tissue.",
        "Small holes or scraping marks.",
        "Leaf wilting or weakened seedlings in severe cases.",
        "Visible beetles on leaves or near seedlings.",
      ],
      possibleCauses: [
        "Adult beetle feeding on leaves.",
        "Larval damage near roots in some beetle species.",
        "Planting maize after grassy areas or pest-favorable conditions.",
      ],
      possibleSolutions: [
        "Scout seedlings and field edges.",
        "Avoid planting immediately after heavily infested grass pasture where this is a known issue.",
        "Remove weeds that shelter pests.",
        "Use locally approved insect control only when pest pressure is high.",
      ],
      prevention: [
        "Monitor early growth stages.",
        "Use crop rotation.",
        "Maintain clean field borders.",
      ],
      appMessage:
        "The model detected symptoms consistent with maize leaf beetle damage. Inspect leaves for chewing marks and look for beetles.",
    },

    "leaf blight": {
      label: "leaf blight",
      displayName: "Maize leaf blight",
      type: "disease",
      crop: "Maize",
      meaning:
        "Maize leaf blight refers to fungal leaf blight symptoms that may include long, tan, gray, or elliptical lesions. Northern corn leaf blight is a common example.",
      visibleSigns: [
        "Long, cigar-shaped or elliptical lesions.",
        "Tan or gray-green lesions running along leaf veins.",
        "Lesions starting on lower leaves and moving upward.",
        "Blighted leaves in severe cases.",
      ],
      possibleCauses: [
        "Fungal pathogens favored by humid conditions.",
        "Susceptible varieties.",
        "Infected crop residues.",
      ],
      possibleSolutions: [
        "Use resistant or tolerant maize varieties.",
        "Rotate with non-maize crops.",
        "Manage infected crop residues.",
        "Improve field airflow and avoid overly dense stands.",
        "Use locally approved fungicides when disease risk is high and according to label instructions.",
      ],
      prevention: [
        "Rotate crops.",
        "Select resistant hybrids.",
        "Scout lower leaves during humid periods.",
        "Avoid continuous maize where blight is severe.",
      ],
      appMessage:
        "The model detected symptoms consistent with maize leaf blight. Check for long tan or gray lesions running along the leaf.",
    },

    "leaf spot": {
      label: "leaf spot",
      displayName: "Maize leaf spot",
      type: "disease",
      crop: "Maize",
      meaning:
        "Maize leaf spot is a general leaf disease category where spots or rectangular lesions appear on the leaves. Gray leaf spot is one important maize leaf spot disease.",
      visibleSigns: [
        "Small to elongated spots on leaves.",
        "Gray, tan, or brown lesions.",
        "Lesions may be rectangular or limited by leaf veins.",
        "Spots may merge under severe infection.",
      ],
      possibleCauses: [
        "Fungal infection such as gray leaf spot pathogens.",
        "High humidity and prolonged leaf wetness.",
        "Infected maize residue.",
      ],
      possibleSolutions: [
        "Rotate maize with non-host crops.",
        "Use resistant or tolerant maize varieties.",
        "Manage crop residues.",
        "Improve airflow through proper spacing.",
        "Use locally recommended fungicides where disease pressure justifies it.",
      ],
      prevention: [
        "Avoid continuous maize in high-risk fields.",
        "Scout during humid conditions.",
        "Choose varieties with disease resistance.",
      ],
      appMessage:
        "The model detected symptoms consistent with maize leaf spot. Inspect for gray or brown lesions and monitor spread.",
    },

    "streak virus": {
      label: "streak virus",
      displayName: "Maize streak virus",
      type: "disease",
      crop: "Maize",
      meaning:
        "Maize streak virus is a viral disease associated with chlorotic streaks on maize leaves and can cause stunting and poor ear development.",
      visibleSigns: [
        "Narrow yellow or pale streaks on leaves.",
        "Stunted plant growth.",
        "Poor ear development.",
        "Reduced plant vigor.",
      ],
      possibleCauses: [
        "Viral infection.",
        "Spread by leafhopper insect vectors.",
        "Susceptible varieties and high vector pressure.",
      ],
      possibleSolutions: [
        "Remove severely infected young plants where practical.",
        "Control weeds and volunteer maize that may host vectors.",
        "Use resistant or tolerant varieties where available.",
        "Manage leafhopper vectors using integrated pest management.",
      ],
      prevention: [
        "Plant resistant varieties.",
        "Avoid late planting in high-risk areas if local advice supports early planting.",
        "Monitor for leafhopper activity.",
        "Maintain field sanitation.",
      ],
      appMessage:
        "The model detected symptoms consistent with maize streak virus. Check for narrow chlorotic streaks and stunted growth.",
    },
  },

  Tomato: {
    healthy: {
      label: "healthy",
      displayName: "Healthy",
      type: "healthy",
      crop: "Tomato",
      meaning:
        "The tomato leaf appears visually healthy based on the classes known by the model.",
      visibleSigns: [
        "Normal green leaf color.",
        "No obvious blight, curling, leaf spot, or wilt symptoms visible.",
      ],
      possibleSolutions: [],
      prevention: [
        "Continue regular scouting.",
        "Water at the base to keep leaves dry.",
        "Stake or cage plants to improve airflow.",
        "Remove crop debris and weeds.",
        "Rotate tomato with non-host crops.",
      ],
      appMessage:
        "The model classified this tomato sample as healthy. Continue monitoring because early symptoms may not always be visible.",
    },

    "leaf blight": {
      label: "leaf blight",
      displayName: "Tomato leaf blight",
      type: "disease",
      crop: "Tomato",
      meaning:
        "Tomato leaf blight refers to leaf disease symptoms that may include brown lesions, yellow halos, and leaf drying. Early blight and late blight are common blight-related tomato problems.",
      visibleSigns: [
        "Brown or dark leaf lesions.",
        "Yellow halos around spots.",
        "Lower leaves affected first in early blight-like symptoms.",
        "Water-soaked lesions in late blight-like symptoms.",
        "Leaf drying or defoliation in severe cases.",
      ],
      possibleCauses: [
        "Fungal or oomycete pathogens depending on the blight type.",
        "Wet leaves and humid conditions.",
        "Infected crop debris or nearby infected plants.",
      ],
      possibleSolutions: [
        "Remove and destroy infected leaves.",
        "Avoid overhead watering.",
        "Stake plants to improve airflow.",
        "Apply mulch to reduce soil splash.",
        "Use locally approved fungicides early when disease risk is high.",
      ],
      prevention: [
        "Rotate away from tomato and related crops.",
        "Use disease-free seedlings.",
        "Keep leaves dry.",
        "Sanitize tools after handling infected plants.",
      ],
      appMessage:
        "The model detected symptoms consistent with tomato leaf blight. Inspect for brown lesions, yellowing, and leaf drying.",
    },

    "leaf curl": {
      label: "leaf curl",
      displayName: "Tomato leaf curl",
      type: "disease",
      crop: "Tomato",
      meaning:
        "Tomato leaf curl may be associated with viral infection, insect vectors such as whiteflies, environmental stress, or herbicide injury. In many production systems, tomato yellow leaf curl virus is an important cause.",
      visibleSigns: [
        "Upward or downward curling of leaves.",
        "Crumpled or distorted young leaves.",
        "Yellowing between veins or along margins.",
        "Stunted, bushy plant growth.",
        "Flower drop and reduced yield in severe infections.",
      ],
      possibleCauses: [
        "Virus infection spread by whiteflies.",
        "Infected seedlings or transplants.",
        "Environmental stress or herbicide drift can also cause curling-like symptoms.",
      ],
      possibleSolutions: [
        "Remove severely infected plants early when viral disease is suspected.",
        "Control whiteflies using integrated pest management.",
        "Use insect-proof nursery protection where possible.",
        "Use disease-free seedlings.",
        "Avoid planting near infected tomato crops.",
      ],
      prevention: [
        "Use resistant varieties where available.",
        "Use yellow sticky traps to monitor whiteflies.",
        "Remove weeds that host whiteflies.",
        "Protect seedlings before transplanting.",
      ],
      appMessage:
        "The model detected symptoms consistent with tomato leaf curl. Check for whiteflies, yellowing, curling, and stunted growth.",
    },

    "septoria leaf spot": {
      label: "septoria leaf spot",
      displayName: "Septoria leaf spot",
      type: "disease",
      crop: "Tomato",
      meaning:
        "Septoria leaf spot is a fungal tomato disease that mainly affects leaves and can cause heavy spotting and defoliation.",
      visibleSigns: [
        "Small circular brown or dark spots.",
        "Gray or tan centers in older spots.",
        "Tiny black dots may appear in spot centers.",
        "Yellowing and leaf drop in severe cases.",
      ],
      possibleCauses: [
        "Fungal infection caused by Septoria lycopersici.",
        "Splashing water from soil or infected debris.",
        "Humid conditions and wet leaves.",
      ],
      possibleSolutions: [
        "Remove infected lower leaves.",
        "Avoid overhead watering and night watering.",
        "Stake plants to improve airflow.",
        "Mulch around plants to reduce soil splash.",
        "Remove crop debris after harvest.",
        "Use locally approved protective fungicides when necessary.",
      ],
      prevention: [
        "Rotate away from tomato for at least two years where possible.",
        "Control weeds related to tomato.",
        "Do not work with plants when leaves are wet.",
        "Keep leaves dry and improve spacing.",
      ],
      appMessage:
        "The model detected symptoms consistent with Septoria leaf spot. Inspect for small circular spots and yellowing lower leaves.",
    },

    "verticulium wilt": {
      label: "verticulium wilt",
      displayName: "Verticillium wilt",
      type: "disease",
      crop: "Tomato",
      meaning:
        "Verticillium wilt is a soil-borne fungal wilt disease that affects the plant’s vascular system and reduces water movement inside the plant.",
      visibleSigns: [
        "Yellowing of lower or older leaves.",
        "Wilting, especially during warm parts of the day.",
        "V-shaped yellow or brown lesions from leaf margins.",
        "Stunted growth.",
        "Progressive decline of the plant.",
      ],
      possibleCauses: [
        "Soil-borne Verticillium fungi.",
        "Infected soil or crop residues.",
        "Susceptible tomato varieties.",
      ],
      possibleSolutions: [
        "Remove severely affected plants.",
        "Do not compost infected plant material.",
        "Use resistant tomato varieties where available.",
        "Rotate with non-host crops for multiple seasons.",
        "Improve soil health and avoid plant stress.",
      ],
      prevention: [
        "Use disease-resistant varieties.",
        "Avoid planting tomatoes repeatedly in infected soil.",
        "Clean tools and equipment.",
        "Remove infected crop debris.",
      ],
      appMessage:
        "The model detected symptoms consistent with Verticillium wilt. Check for lower leaf yellowing, wilting, and V-shaped lesions.",
    },
  },
};
