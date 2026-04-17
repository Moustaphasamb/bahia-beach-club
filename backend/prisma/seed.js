const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Bahia Beach Club database...');

  // ── ADMIN USER ──────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'admin@bahia.sn' },
    update: {},
    create: {
      name: 'Bahia Admin',
      email: 'admin@bahia.sn',
      password: bcrypt.hashSync('bahia2025', 10),
      role: 'admin'
    }
  });
  console.log('✅ Admin user créé : admin@bahia.sn / bahia2025');

  // ── MENU ITEMS ──────────────────────────────────────
  const menuItems = [

    // ═══════════════════════════════════════
    // MOCKTAILS
    // ═══════════════════════════════════════
    { cat:'mocktails', name:'Le Bahia',           emoji:'🌟', price:5000, desc:'Purée de passion, mangue fraîche, purée de mangue, purée d\'ananas, jus de citron. La signature sans alcool.',    ingr:['Purée de passion','Mangue fraîche','Purée de mangue','Purée d\'ananas','Jus de citron'], intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,180,0,.22),rgba(255,100,50,.15))' },
    { cat:'mocktails', name:'Bubble',             emoji:'🫧', price:5000, desc:'Purée de fraise, sirop de bubble gum, feuilles de menthe, jus de citron, Red Bull. Pétillant et festif.',        ingr:['Purée de fraise','Sirop bubble gum','Menthe','Jus de citron','Red Bull'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,80,120,.22),rgba(200,40,100,.15))' },
    { cat:'mocktails', name:'Palmier',            emoji:'🌴', price:5000, desc:'Purée de litchi, purée de passion, purée d\'ananas, jus d\'orange, eau gazeuse. Fraîcheur tropicale.',            ingr:['Purée de litchi','Purée de passion','Purée d\'ananas','Jus d\'orange','Eau gazeuse'],   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,180,100,.2),rgba(20,120,60,.15))' },
    { cat:'mocktails', name:'Red Light',          emoji:'🔴', price:5000, desc:'Fruits rouges, purée de passion, jus d\'orange, jus de citron. Intense et vitaminé.',                             ingr:['Fruits rouges','Purée de passion','Jus d\'orange','Jus de citron'],                      intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,30,60,.22),rgba(160,10,30,.15))' },
    { cat:'mocktails', name:'Banana Beach',       emoji:'🍌', price:5000, desc:'Purée de pêche, purée de banane, banane fraîche, jus d\'orange, jus d\'ananas. Douceur du soleil.',              ingr:['Purée de pêche','Purée de banane','Banane fraîche','Jus d\'orange','Jus d\'ananas'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,200,0,.22),rgba(220,140,20,.15))' },
    { cat:'mocktails', name:'Pinky',              emoji:'🩷', price:5000, desc:'Purée de fraise, crème fraîche, jus d\'orange, sirop de fraise, chantilly. Un nuage rose en verre.',              ingr:['Purée de fraise','Crème fraîche','Jus d\'orange','Sirop de fraise','Chantilly'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,100,160,.22),rgba(200,60,120,.15))' },
    { cat:'mocktails', name:'Mocktail Saisonnier',emoji:'🍃', price:6000, desc:'Création saisonnière de notre barman. Demandez la composition du jour à votre serveur.',                          ingr:['Selon saison'],                                                                         intensity:0, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(100,200,100,.2),rgba(40,140,80,.15))' },

    // ═══════════════════════════════════════
    // COCKTAILS
    // ═══════════════════════════════════════
    { cat:'cocktails', name:'Sunkiss',            emoji:'☀️', price:6000, desc:'Rhum, jus d\'orange, feuilles de menthe, purée de pêche, jus de citron. Le baiser du soleil.',                   ingr:['Rhum','Jus d\'orange','Menthe','Purée de pêche','Jus de citron'],                       intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,160,0,.22),rgba(220,80,20,.15))' },
    { cat:'cocktails', name:'Frozen Passion',     emoji:'🧊', price:6000, desc:'Tequila, Cointreau, purée de passion, jus de citron. Glacé, explosif, inoubliable.',                              ingr:['Tequila','Cointreau','Purée de passion','Jus de citron'],                               intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,120,0,.22),rgba(200,40,80,.15))' },
    { cat:'cocktails', name:'Green',              emoji:'🌿', price:6000, desc:'Gin, concombre frais, sirop de concombre, jus de citron. Végétal et frais comme l\'océan.',                       ingr:['Gin','Concombre frais','Sirop de concombre','Jus de citron'],                           intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,180,80,.22),rgba(10,120,50,.15))' },
    { cat:'cocktails', name:'Jant Bi',            emoji:'🍍', price:6000, desc:'Vodka, purée d\'ananas, jus d\'ananas, purée de fraise, jus de citron. La beauté en wolof.',                      ingr:['Vodka','Purée d\'ananas','Jus d\'ananas','Purée de fraise','Jus de citron'],             intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,160,20,.22),rgba(200,60,80,.15))' },
    { cat:'cocktails', name:'Rainbow',            emoji:'🌈', price:6000, desc:'Vodka, purée de pêche, jus d\'orange, jus de citron, curaçao bleu, vin rouge. Toutes les couleurs.',              ingr:['Vodka','Purée de pêche','Jus d\'orange','Curaçao bleu','Vin rouge'],                    intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(100,100,220,.22),rgba(200,60,60,.15))' },
    { cat:'cocktails', name:'Coco',               emoji:'🥥', price:6000, desc:'Rhum blanc, rhum brun, purée de banane, mangue fraîche, lait de coco. L\'Atlantique en bouche.',                  ingr:['Rhum blanc','Rhum brun','Purée de banane','Mangue fraîche','Lait de coco'],              intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,80,.22),rgba(100,80,20,.15))' },
    { cat:'cocktails', name:'Les Classiques',     emoji:'🍸', price:6000, desc:'Mojito, Caïpirinha, Cosmopolitan, Margarita, Daïquiri... Demandez votre classique préféré.',                      ingr:['Selon choix'],                                                                          intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(0,180,160,.2),rgba(0,100,120,.15))' },
    { cat:'cocktails', name:'Cocktail Saisonnier',emoji:'🍹', price:7000, desc:'Création signature de notre barman selon les saveurs de la saison. À découvrir !',                               ingr:['Selon saison'],                                                                         intensity:3, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(180,40,160,.22),rgba(80,0,120,.15))' },

    // ═══════════════════════════════════════
    // SOFTS & EAUX
    // ═══════════════════════════════════════
    { cat:'softs', name:'Coca-Cola',            emoji:'🥤', price:2000, desc:'Coca-Cola bien frais.',                                       ingr:['Coca-Cola'],     intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,0,0,.18),rgba(100,0,0,.12))' },
    { cat:'softs', name:'Sprite',               emoji:'🥤', price:2000, desc:'Sprite citron bien frais.',                                   ingr:['Sprite'],        intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,160,60,.18),rgba(20,100,20,.12))' },
    { cat:'softs', name:'Fanta',                emoji:'🍊', price:2000, desc:'Fanta orange bien frais.',                                    ingr:['Fanta'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,120,0,.18),rgba(200,60,0,.12))' },
    { cat:'softs', name:'Tonic',                emoji:'💧', price:2000, desc:'Schweppes Tonic.',                                             ingr:['Tonic'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,180,220,.18),rgba(20,100,160,.12))' },
    { cat:'softs', name:'Soda',                 emoji:'💧', price:2000, desc:'Soda frais.',                                                  ingr:['Soda'],          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(100,160,220,.18),rgba(40,80,160,.12))' },
    { cat:'softs', name:'Casamançaise 1/2L',    emoji:'💧', price:1000, desc:'Eau minérale Casamançaise — demi-bouteille.',                 ingr:['Eau minérale'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,160,200,.16),rgba(20,80,140,.1))' },
    { cat:'softs', name:'Casamançaise 1L',      emoji:'💧', price:2000, desc:'Eau minérale Casamançaise — 1 litre.',                        ingr:['Eau minérale'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,160,200,.16),rgba(20,80,140,.1))' },
    { cat:'softs', name:'Kirène 1/2L',          emoji:'💧', price:1000, desc:'Eau minérale Kirène — demi-bouteille.',                       ingr:['Eau minérale'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,140,180,.16),rgba(10,60,120,.1))' },
    { cat:'softs', name:'Kirène 1L',            emoji:'💧', price:2000, desc:'Eau minérale Kirène — 1 litre.',                              ingr:['Eau minérale'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,140,180,.16),rgba(10,60,120,.1))' },
    { cat:'softs', name:'Kirène Gazeuse 0,75cl',emoji:'🫧', price:2500, desc:'Eau minérale Kirène gazeuse — 75cl.',                        ingr:['Eau gazeuse'],   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,160,200,.16),rgba(30,80,140,.1))' },
    { cat:'softs', name:'Perrier 1/2L',         emoji:'🫧', price:1500, desc:'Eau Perrier pétillante — demi-bouteille.',                    ingr:['Perrier'],       intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,180,100,.16),rgba(10,100,50,.1))' },
    { cat:'softs', name:'Perrier 0,70cl',       emoji:'🫧', price:3000, desc:'Eau Perrier pétillante — 70cl.',                              ingr:['Perrier'],       intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,180,100,.16),rgba(10,100,50,.1))' },

    // ═══════════════════════════════════════
    // JUS
    // ═══════════════════════════════════════
    { cat:'jus', name:'Orange Pressée', emoji:'🍊', price:3000, desc:'Oranges fraîches pressées à la minute. Vitaminé et naturel.',                                             ingr:['Oranges fraîches'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,140,0,.2),rgba(200,80,0,.14))' },
    { cat:'jus', name:'Citron Pressé',  emoji:'🍋', price:3000, desc:'Citrons frais pressés à la minute. Acidulé et rafraîchissant.',                                          ingr:['Citrons frais','Sucre'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,200,0,.2),rgba(160,140,0,.14))' },
    { cat:'jus', name:'Bissap',         emoji:'🌺', price:2000, desc:'Infusion d\'hibiscus maison. Floral, légèrement acidulé, emblématique du Sénégal.',                     ingr:['Hibiscus','Eau','Sucre'],   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,30,80,.2),rgba(120,10,50,.14))' },
    { cat:'jus', name:'Bouye',          emoji:'🥛', price:2000, desc:'Jus de baobab — pain de singe. Onctueux, vitaminé, 100% sénégalais.',                                  ingr:['Jus de baobab','Sucre'],   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,100,.2),rgba(160,110,50,.14))' },
    { cat:'jus', name:'Gingembre',      emoji:'🫚', price:2000, desc:'Jus de gingembre frais. Piquant, tonique, idéal pour commencer la soirée.',                             ingr:['Gingembre frais','Sucre'], intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,140,40,.2),rgba(140,80,10,.14))' },

    // ═══════════════════════════════════════
    // BIÈRES
    // ═══════════════════════════════════════
    { cat:'bieres', name:'Flag',                emoji:'🍺', price:2500, desc:'La bière nationale du Sénégal. Légère et rafraîchissante.',              ingr:['Flag'],          intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Gazelle 33cl',        emoji:'🍺', price:2500, desc:'Gazelle blonde sénégalaise — format 33cl. Douce et désaltérante.',       ingr:['Gazelle'],       intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Gazelle 63cl',        emoji:'🍺', price:3000, desc:'Gazelle blonde sénégalaise — grand format 63cl. Pour partager.',          ingr:['Gazelle'],       intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Heineken',            emoji:'🍺', price:3000, desc:'Heineken, la référence internationale. Fraîche et houblonnée.',           ingr:['Heineken'],      intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,160,40,.2),rgba(10,100,10,.14))' },
    { cat:'bieres', name:'Sagres Citron',       emoji:'🍋', price:3000, desc:'Sagres au citron — légère et fruitée. Parfaite en bord de mer.',          ingr:['Sagres Citron'], intensity:1, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,200,0,.2),rgba(120,140,0,.14))' },
    { cat:'bieres', name:'Sagres',              emoji:'🍺', price:3000, desc:'Sagres blonde portugaise. Fraîche et légère.',                            ingr:['Sagres'],        intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,140,20,.2),rgba(120,90,0,.14))' },
    { cat:'bieres', name:'33 Export',           emoji:'🍺', price:3500, desc:'33 Export, la classique. Houblonnée et équilibrée.',                      ingr:['33 Export'],     intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,120,20,.2),rgba(100,60,0,.14))' },
    { cat:'bieres', name:'Desperados',          emoji:'🍺', price:3500, desc:'Desperados aromatisée tequila. Original et festif.',                      ingr:['Desperados'],    intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,20,.2),rgba(140,50,0,.14))' },
    { cat:'bieres', name:'Flag Pression 50cl',  emoji:'🍻', price:4000, desc:'Flag à la pression — format 50cl. La meilleure façon de boire la Flag.',  ingr:['Flag pression'], intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Flag Pression 25cl',  emoji:'🍻', price:2500, desc:'Flag à la pression — demi (25cl).',                                       ingr:['Flag pression'], intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Gazelle Pression 50cl',emoji:'🍻',price:4000, desc:'Gazelle à la pression — format 50cl. Fraîche à souhait.',                 ingr:['Gazelle pression'],intensity:2,ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },
    { cat:'bieres', name:'Gazelle Pression 25cl',emoji:'🍻',price:2500, desc:'Gazelle à la pression — demi (25cl).',                                    ingr:['Gazelle pression'],intensity:2,ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,40,.2),rgba(140,100,10,.14))' },

    // ═══════════════════════════════════════
    // SHOOTERS
    // ═══════════════════════════════════════
    { cat:'shooters', name:'Tequila',                  emoji:'🥃', price:3000, desc:'Shot de tequila blanche. Simple et direct.',                                    ingr:['Tequila'],                               intensity:5, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,60,.2),rgba(120,90,10,.14))' },
    { cat:'shooters', name:'B-52',                     emoji:'🔥', price:4000, desc:'Kahlúa, Baileys, Triple Sec. Le classique des shooters en couches.',             ingr:['Kahlúa','Baileys','Triple Sec'],          intensity:5, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,40,10,.25),rgba(40,15,5,.18))' },
    { cat:'shooters', name:'Tequila Pêche & Citron',   emoji:'🍑', price:4000, desc:'Tequila avec purée de pêche et jus de citron. Fruité et intense.',              ingr:['Tequila','Purée de pêche','Jus de citron'],intensity:5, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,140,60,.22),rgba(200,80,20,.15))' },
    { cat:'shooters', name:'Rhum Vodka',               emoji:'💥', price:5000, desc:'Shot mi-rhum mi-vodka. Pour les plus courageux.',                                ingr:['Rhum','Vodka'],                          intensity:5, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,40,160,.22),rgba(80,0,100,.15))' },

    // ═══════════════════════════════════════
    // ENTRÉES
    // ═══════════════════════════════════════
    { cat:'entrees', name:'Ceviche',                           emoji:'🦐', price:6000, desc:'Calamar, crevette, moule, poivron mariné en citron. Fraîcheur de la mer servie froide.',            ingr:['Calamar','Crevette','Moule','Poivron','Citron'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,160,200,.18),rgba(10,80,140,.12))' },
    { cat:'entrees', name:'Tartare de Poisson',                emoji:'🐟', price:6000, desc:'Poisson frais du jour, échalotes, câpres, vinaigrette citronnée. Délicat et fin.',                  ingr:['Poisson du jour','Échalotes','Câpres','Citron'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,160,180,.18),rgba(10,80,120,.12))' },
    { cat:'entrees', name:'Crispy de Poulet Épicé Sauce Tartare',emoji:'🍗',price:6500,desc:'Lanières de poulet épicées et croustillantes, servies avec une sauce tartare maison.',            ingr:['Poulet','Épices','Farine','Sauce tartare'],                   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,140,40,.18),rgba(160,80,10,.12))' },
    { cat:'entrees', name:'Terrine de Poisson',                emoji:'🐠', price:7000, desc:'Terrine de poisson maison, sauce verte, pain grillé. Raffinée et généreuse.',                       ingr:['Poisson','Herbes','Sauce verte'],                             intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,160,160,.18),rgba(10,80,100,.12))' },
    { cat:'entrees', name:'Salade Exotique',                   emoji:'🥗', price:7000, desc:'Mangue, avocat, gambas, ananas, vinaigrette passion. Une explosion tropicale.',                     ingr:['Mangue','Avocat','Gambas','Ananas','Vinaigrette passion'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,180,80,.18),rgba(30,110,30,.12))' },
    { cat:'entrees', name:'Salade César',                      emoji:'🥬', price:7500, desc:'Laitue romaine, croûtons, parmesan, anchois, sauce César maison.',                                  ingr:['Romaine','Croûtons','Parmesan','Anchois','Sauce César'],      intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,140,60,.18),rgba(20,80,20,.12))' },
    { cat:'entrees', name:'Salade de Chèvre Chaud',            emoji:'🧀', price:8500, desc:'Mesclun, chèvre chaud sur croûton, noix, miel, vinaigrette balsamique.',                            ingr:['Mesclun','Fromage de chèvre','Noix','Miel','Balsamique'],     intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,80,.18),rgba(160,120,20,.12))' },

    // ═══════════════════════════════════════
    // À PARTAGER
    // ═══════════════════════════════════════
    { cat:'partager', name:'A Table ! (3 tapas)',            emoji:'🤝', price:18500, desc:'3 tapas au choix parmi notre sélection. Parfait pour deux. Demandez la liste au serveur.',           ingr:['3 tapas au choix'],                                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,120,60,.2),rgba(140,60,10,.14))' },
    { cat:'partager', name:'Grosse Faim (5 tapas)',          emoji:'🍽️', price:27000, desc:'5 tapas au choix. Pour les appétits généreux ou les tablées festives.',                            ingr:['5 tapas au choix'],                                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,40,.2),rgba(140,40,0,.14))' },
    { cat:'partager', name:'Plateau Salé (4 pers)',          emoji:'🧆', price:23000, desc:'Sélection de mets salés pour 4 personnes. Charcuteries, fromages, accompagnements.',               ingr:['Sélection salée pour 4 personnes'],                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,120,80,.2),rgba(120,70,20,.14))' },
    { cat:'partager', name:'Planche de Fruits de Mer (4 pers)',emoji:'🦞',price:37000,desc:'Plateau royal : gambas, crevettes, moules, huîtres, calamar grillé pour 4 personnes.',           ingr:['Gambas','Crevettes','Moules','Huîtres','Calamar'],            intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,140,180,.2),rgba(10,60,120,.14))' },

    // ═══════════════════════════════════════
    // NOS PLATS
    // ═══════════════════════════════════════
    { cat:'plats', name:'Yassa Poulet',                      emoji:'🍗', price:6500,  desc:'Poulet mariné au citron, oignons caramélisés, olives, moutarde, riz blanc. La tradition.',          ingr:['Poulet','Citron','Oignons','Moutarde','Olives','Riz'],        intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,160,40,.2),rgba(160,100,10,.14))' },
    { cat:'plats', name:'Yassa Poisson',                     emoji:'🐟', price:7000,  desc:'Poisson du jour au yassa — citron, oignons, olives, riz blanc. Fin et savoureux.',                  ingr:['Poisson du jour','Citron','Oignons','Olives','Riz'],          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,160,200,.2),rgba(10,80,140,.14))' },
    { cat:'plats', name:'Pavé de Capitaine Sauce Crème d\'Ail',emoji:'🐡',price:10000,desc:'Filet de capitaine poêlé, sauce crème d\'ail, légumes de saison.',                                ingr:['Capitaine','Crème d\'ail','Légumes'],                         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,120,180,.2),rgba(10,60,120,.14))' },
    { cat:'plats', name:'Curry d\'Agneau aux Légumes Thai',   emoji:'🍛', price:12000, desc:'Épaule d\'agneau, curry thaï, lait de coco, légumes croquants, riz jasmin.',                       ingr:['Agneau','Curry','Lait de coco','Légumes','Riz jasmin'],       intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,140,20,.2),rgba(140,80,0,.14))' },
    { cat:'plats', name:'Blanquette de la Mer',              emoji:'🦐', price:14500, desc:'Crevettes, noix de Saint-Jacques, poisson du jour en sauce blanquette. Royal.',                     ingr:['Crevettes','Saint-Jacques','Poisson','Sauce blanquette'],    intensity:0, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(240,220,180,.2),rgba(180,140,60,.14))' },
    { cat:'plats', name:'Tournedos de Boeuf Flambé',         emoji:'🥩', price:15000, desc:'Médaillon de boeuf flambé au cognac, sauce poivre, purée maison. La pièce maîtresse.',              ingr:['Boeuf','Cognac','Sauce poivre','Purée maison'],               intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,40,10,.22),rgba(100,20,5,.15))' },

    // ═══════════════════════════════════════
    // GRILLADES
    // ═══════════════════════════════════════
    { cat:'grillades', name:'Brochettes de Taouck (Poulet)', emoji:'🍢', price:9000,  desc:'Brochettes de poulet mariné aux épices, sauce arachide, légumes grillés. Tendre et parfumé.',      ingr:['Poulet','Épices','Sauce arachide','Légumes grillés'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,120,20,.2),rgba(160,60,0,.14))' },
    { cat:'grillades', name:'1/2 Poulet Braisé',             emoji:'🍗', price:9000,  desc:'Demi-poulet braisé au feu de bois, marinade maison, frites ou riz.',                               ingr:['Poulet','Marinade maison','Frites'],                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,20,.2),rgba(140,50,0,.14))' },
    { cat:'grillades', name:'Dorade Braisée',                emoji:'🐟', price:11500, desc:'Dorade entière braisée au charbon, herbes fraîches, légumes, sauce citron-persil.',                 ingr:['Dorade','Herbes fraîches','Légumes','Citron'],                intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,160,180,.2),rgba(10,80,120,.14))' },
    { cat:'grillades', name:'Dibi Mouton',                   emoji:'🐑', price:11500, desc:'Viande de mouton grillée à la dibi, sauce moutarde-oignon. La street food élevée au rang de plat.', ingr:['Mouton','Sauce moutarde','Oignons'],                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,80,20,.2),rgba(100,40,0,.14))' },
    { cat:'grillades', name:'Gigot d\'Agneau',               emoji:'🍖', price:11500, desc:'Gigot d\'agneau grillé, herbes de Provence, légumes rôtis. Élégant et savoureux.',                  ingr:['Agneau','Herbes de Provence','Légumes rôtis'],                intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,80,40,.2),rgba(120,40,10,.14))' },
    { cat:'grillades', name:'Entrecôte de Boeuf',            emoji:'🥩', price:12000, desc:'Entrecôte grillée, sauce au choix (poivre, champignons, café), frites maison.',                     ingr:['Entrecôte','Sauce','Frites maison'],                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,40,10,.22),rgba(100,20,5,.15))' },
    { cat:'grillades', name:'Gambas Grillées',               emoji:'🦐', price:13000, desc:'Gambas entières grillées, beurre à l\'ail et citron, riz ou pain.',                                 ingr:['Gambas','Beurre','Ail','Citron'],                             intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,80,60,.2),rgba(160,30,20,.14))' },
    { cat:'grillades', name:'Thiof Grillé',                  emoji:'🐡', price:14000, desc:'Thiof (mérou) entier grillé, la fierté du Sénégal. Marinade citron-herbes, légumes grillés.',       ingr:['Thiof','Citron','Herbes','Légumes'],                          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,140,180,.2),rgba(10,60,120,.14))' },

    // ═══════════════════════════════════════
    // PÂTES
    // ═══════════════════════════════════════
    { cat:'pates', name:'Tagliatelles Carbonara',             emoji:'🍝', price:8000,  desc:'Tagliatelles fraîches, lardons fumés, jaune d\'œuf, parmesan, crème. L\'authentique.',             ingr:['Tagliatelles','Lardons','Œuf','Parmesan','Crème'],            intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,100,.2),rgba(160,120,40,.14))' },
    { cat:'pates', name:'Wok de Crevettes Sautées aux Pâtes', emoji:'🦐', price:8500,  desc:'Crevettes sautées wok, légumes croquants, nouilles, sauce huître et gingembre.',                   ingr:['Crevettes','Légumes','Nouilles','Sauce huître','Gingembre'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,80,40,.2),rgba(140,30,10,.14))' },
    { cat:'pates', name:'Fusilli au Saumon et à l\'Aneth',    emoji:'🐟', price:10000, desc:'Fusilli, saumon fumé, aneth, crème légère, câpres. Raffiné et iodé.',                               ingr:['Fusilli','Saumon fumé','Aneth','Crème','Câpres'],             intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,100,60,.2),rgba(180,50,20,.14))' },
    { cat:'pates', name:'Bobun Boeuf',                        emoji:'🍜', price:12000, desc:'Vermicelles de riz, boeuf grillé, herbes fraîches, légumes, sauce nuoc-mâm. Voyage en Asie.',       ingr:['Vermicelles','Boeuf','Herbes fraîches','Sauce nuoc-mâm'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,80,20,.2),rgba(100,40,0,.14))' },

    // ═══════════════════════════════════════
    // BURGERS & SANDWICHS
    // ═══════════════════════════════════════
    { cat:'burgers', name:'Royal Chawarma',              emoji:'🌯', price:6500, desc:'Viande mixte, légumes, sauce blanche et harissa, pain pita chaud.',                                       ingr:['Viande mixte','Légumes','Sauce blanche','Harissa','Pita'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,120,40,.2),rgba(140,60,0,.14))' },
    { cat:'burgers', name:'Croque Monsieur / Madame',    emoji:'🥪', price:6500, desc:'Jambon, emmental fondant, béchamel. Version Madame avec un œuf parfait.',                                 ingr:['Jambon','Emmental','Béchamel','Pain de mie'],                intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,80,.2),rgba(160,120,20,.14))' },
    { cat:'burgers', name:'Fish Burger',                 emoji:'🐟', price:6500, desc:'Filet de poisson croustillant, sauce tartare, laitue, tomate, pain brioché grillé.',                       ingr:['Filet de poisson','Sauce tartare','Laitue','Tomate','Brioche'],intensity:0,ar:false,isNew:false, grad:'linear-gradient(135deg,rgba(40,160,200,.2),rgba(10,80,140,.14))' },
    { cat:'burgers', name:'Croustillant Chicken Burger', emoji:'🍔', price:7000, desc:'Poulet croustillant épicé, coleslaw, cornichons, sauce BBQ, pain brioché.',                               ingr:['Poulet croustillant','Coleslaw','Cornichons','Sauce BBQ'],    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,120,20,.2),rgba(160,60,0,.14))' },
    { cat:'burgers', name:'Triple Cheese Burger',        emoji:'🍔', price:8500, desc:'Double steak haché, trois fromages fondants, oignons caramélisés, sauce spéciale.',                       ingr:['Double steak','3 fromages','Oignons caramélisés','Sauce'],   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,20,.2),rgba(140,50,0,.14))' },
    { cat:'burgers', name:'Double Bacon Burger',         emoji:'🥓', price:9500, desc:'Double steak haché, bacon croustillant, cheddar, tomate, laitue, sauce mayo-moutarde.',                   ingr:['Double steak','Bacon','Cheddar','Tomate','Sauce mayo'],       intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,40,10,.22),rgba(100,20,5,.15))' },

    // ═══════════════════════════════════════
    // PLATS DU JOUR (6 000 FCFA)
    // ═══════════════════════════════════════
    { cat:'plats_jour', name:'Lundi — Curry de Cabillaud',   emoji:'📅', price:6000, desc:'Filet de cabillaud, curry de légumes au lait de coco, riz basmati. Léger et parfumé.',               ingr:['Cabillaud','Curry','Lait de coco','Riz basmati'],             intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,140,20,.2),rgba(140,80,0,.14))' },
    { cat:'plats_jour', name:'Mardi — Mafé',                 emoji:'📅', price:6000, desc:'Viande de boeuf mijotée en sauce arachide, légumes, riz. Un incontournable sénégalais.',              ingr:['Boeuf','Sauce arachide','Légumes','Riz'],                     intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,100,20,.2),rgba(120,50,0,.14))' },
    { cat:'plats_jour', name:'Mercredi — Lasagnes de Boeuf', emoji:'📅', price:6000, desc:'Lasagnes maison, viande hachée de boeuf, béchamel, parmesan gratinés au four.',                       ingr:['Pâtes à lasagne','Boeuf','Béchamel','Parmesan'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,80,20,.2),rgba(120,40,0,.14))' },
    { cat:'plats_jour', name:'Jeudi — Thiéboudienne Rouge',  emoji:'📅', price:6000, desc:'Le plat national — riz rouge au poisson, légumes du marché, sauce tomate. Généreux.',                 ingr:['Riz brisé','Poisson','Légumes','Sauce tomate'],               intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,80,20,.2),rgba(160,40,10,.14))' },
    { cat:'plats_jour', name:'Vendredi — Parmentier d\'Agneau',emoji:'📅',price:6000,desc:'Agneau confit effiloché, purée de pommes de terre gratinée. Comfort food au sommet.',                 ingr:['Agneau effiloché','Purée de pommes de terre'],               intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,80,40,.2),rgba(100,40,10,.14))' },

    // ═══════════════════════════════════════
    // DESSERTS
    // ═══════════════════════════════════════
    { cat:'desserts', name:'Tiramisu Spéculos',                        emoji:'☕', price:5000, desc:'Tiramisu revisité aux spéculoos, mascarpone vanillé. Crémeux et réconfortant.',              ingr:['Spéculoos','Mascarpone','Café','Vanille'],                    intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(140,80,20,.22),rgba(80,40,5,.15))' },
    { cat:'desserts', name:'Crème Brûlée Passion',                     emoji:'🔥', price:5000, desc:'Crème brûlée classique au caramel croquant, infusion de fruit de la passion.',               ingr:['Crème','Œufs','Sucre','Fruit de la passion'],                intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,160,20,.22),rgba(200,80,0,.15))' },
    { cat:'desserts', name:'Pana Cotta Vanille & Fruits Exotiques',    emoji:'🍮', price:5500, desc:'Pana cotta à la vanille de Madagascar, coulis de fruits exotiques.',                         ingr:['Crème','Vanille','Gélatine','Fruits exotiques'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,200,120,.2),rgba(180,140,40,.14))' },
    { cat:'desserts', name:'Tarte Pommes & Amandes, Glace Vanille',    emoji:'🥧', price:5500, desc:'Tarte fine aux pommes caramélisées, crème d\'amande, glace vanille maison.',                 ingr:['Pommes','Amandes','Crème d\'amande','Glace vanille'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,160,60,.2),rgba(160,100,20,.14))' },
    { cat:'desserts', name:'Salade de Fruits',                         emoji:'🍍', price:5500, desc:'Fruits tropicaux frais, menthe, jus de citron vert, sirop de fleur d\'oranger.',             ingr:['Mangue','Ananas','Papaye','Pastèque','Menthe'],               intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,40,.2),rgba(180,80,40,.14))' },
    { cat:'desserts', name:'Île Flottante',                            emoji:'🥛', price:5500, desc:'Blancs en neige sur crème anglaise, caramel filé, amandes torréfiées.',                      ingr:['Blancs d\'œuf','Crème anglaise','Caramel','Amandes'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,220,180,.2),rgba(200,160,80,.14))' },
    { cat:'desserts', name:'Cœur Coulant Chocolat & Glace',            emoji:'🍫', price:6000, desc:'Fondant au chocolat noir, cœur coulant, glace chocolat maison.',                             ingr:['Chocolat noir','Beurre','Œufs','Sucre','Farine'],            intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,40,10,.28),rgba(40,15,5,.22))' },
    { cat:'desserts', name:'Cheesecake au Fromage Blanc',              emoji:'🍰', price:6000, desc:'Cheesecake maison au fromage blanc, coulis de fruits rouges, spéculoos émietté.',            ingr:['Fromage blanc','Spéculoos','Fruits rouges','Sucre'],          intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,140,.2),rgba(140,40,80,.14))' },
    { cat:'desserts', name:'Crumble Raisin Rouge',                     emoji:'🍇', price:6000, desc:'Crumble aux raisins rouges et épices douces, crème glacée vanille.',                         ingr:['Raisins rouges','Farine','Beurre','Sucre','Glace vanille'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(120,20,100,.2),rgba(60,0,60,.14))' },
    { cat:'desserts', name:'Profiteroles à la Crème Pâtissière',       emoji:'🍩', price:7000, desc:'Choux garnis de crème pâtissière, sauce chocolat chaud, amandes effilées.',                 ingr:['Pâte à choux','Crème pâtissière','Chocolat','Amandes'],       intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(100,60,20,.22),rgba(50,25,5,.15))' },
    { cat:'desserts', name:'Mousse 3 Chocolats',                       emoji:'🍫', price:7000, desc:'Trois couches de mousse : chocolat blanc, lait et noir. Un dessert de haute voltige.',       ingr:['Chocolat blanc','Chocolat au lait','Chocolat noir','Crème'],  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,40,10,.28),rgba(40,15,5,.22))' },

    // ═══════════════════════════════════════
    // MENUS ENFANTS
    // ═══════════════════════════════════════
    { cat:'enfants', name:'Menu Enfant Complet',       emoji:'👶', price:10000, desc:'Entrée + Plat + Dessert + Boisson. Menu adapté aux enfants — demandez la composition au serveur.', ingr:['Entrée','Plat','Dessert','Boisson'], intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(100,200,200,.2),rgba(40,140,160,.14))' },
    { cat:'enfants', name:'Menu Enfant Plat & Dessert',emoji:'🧒', price:8000,  desc:'Plat + Dessert + Boisson. Idéal pour les petites faims — demandez la composition au serveur.',   ingr:['Plat','Dessert','Boisson'],         intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(100,180,220,.2),rgba(40,100,160,.14))' },

    // ═══════════════════════════════════════
    // WHISKY (prix au verre)
    // ═══════════════════════════════════════
    { cat:'whisky', name:'J&B (verre)',          emoji:'🥃', price:4000,  desc:'J&B Rare — blended scotch whisky. Bouteille disponible : 40 000 FCFA.',                          ingr:['J&B'],             intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,60,.2),rgba(140,100,10,.14))' },
    { cat:'whisky', name:'Ballantines (verre)',  emoji:'🥃', price:4500,  desc:'Ballantines Finest — blended scotch. Bouteille disponible : 45 000 FCFA.',                        ingr:['Ballantines'],     intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,140,40,.2),rgba(140,80,0,.14))' },
    { cat:'whisky', name:'Red Label (verre)',    emoji:'🥃', price:4500,  desc:'Johnnie Walker Red Label. Bouteille disponible : 45 000 FCFA.',                                   ingr:['Red Label'],       intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,20,20,.2),rgba(140,0,0,.14))' },
    { cat:'whisky', name:'Jack Daniel\'s (verre)',emoji:'🥃',price:5000,  desc:'Jack Daniel\'s Tennessee Whiskey. Bouteille disponible : 50 000 FCFA.',                           ingr:['Jack Daniel\'s'],  intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(40,30,20,.25),rgba(20,10,5,.18))' },
    { cat:'whisky', name:'Jameson (verre)',      emoji:'🥃', price:5000,  desc:'Jameson Irish Whiskey — doux et triple distillé. Bouteille disponible : 50 000 FCFA.',            ingr:['Jameson'],         intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(20,100,40,.2),rgba(10,60,20,.14))' },
    { cat:'whisky', name:'Black Label (verre)', emoji:'🥃', price:7000,  desc:'Johnnie Walker Black Label 12 ans. Bouteille disponible : 80 000 FCFA.',                          ingr:['Black Label'],     intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(20,20,20,.3),rgba(10,10,10,.22))' },
    { cat:'whisky', name:'Aberlour 12 (verre)', emoji:'🥃', price:7500,  desc:'Aberlour 12 ans — single malt des Highlands. Notes de fruits et de miel.',                        ingr:['Aberlour 12'],     intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,140,60,.2),rgba(140,80,10,.14))' },
    { cat:'whisky', name:'Glenfiddich 12 (verre)',emoji:'🥃',price:7500,  desc:'Glenfiddich 12 ans — single malt emblématique. Fruité. Bouteille : 85 000 FCFA.',                 ingr:['Glenfiddich 12'],  intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,60,.2),rgba(140,100,10,.14))' },
    { cat:'whisky', name:'Chivas 12 (verre)',   emoji:'🥃', price:7500,  desc:'Chivas Regal 12 ans — blended scotch premium. Bouteille disponible : 85 000 FCFA.',               ingr:['Chivas 12'],       intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,140,40,.2),rgba(120,80,0,.14))' },
    { cat:'whisky', name:'Chivas 18 (verre)',   emoji:'🥃', price:10000, desc:'Chivas Regal 18 ans — expression premium complexe et raffinée. Bouteille : 110 000 FCFA.',         ingr:['Chivas 18'],       intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,160,60,.22),rgba(160,100,20,.15))' },

    // ═══════════════════════════════════════
    // AUTRES ALCOOLS (prix au verre)
    // ═══════════════════════════════════════
    { cat:'alcools', name:'Pastis (verre)',      emoji:'🌿', price:3000, desc:'Pastis anisé — à déguster avec de l\'eau fraîche. Bouteille : 35 000 FCFA.',     ingr:['Pastis'],        intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,40,.2),rgba(160,120,0,.14))' },
    { cat:'alcools', name:'Ricard (verre)',      emoji:'🌿', price:3000, desc:'Ricard pastis de Marseille. Bouteille disponible : 37 000 FCFA.',                 ingr:['Ricard'],        intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,40,.2),rgba(160,120,0,.14))' },
    { cat:'alcools', name:'Campari (verre)',     emoji:'🍷', price:3500, desc:'Campari — apéritif amer. Idéal en spritz ou sur glace. Bouteille : 40 000 FCFA.', ingr:['Campari'],       intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,20,20,.2),rgba(140,0,0,.14))' },
    { cat:'alcools', name:'Malibu (verre)',      emoji:'🥥', price:3500, desc:'Malibu rhum-coco — léger et tropical. Bouteille disponible : 40 000 FCFA.',       ingr:['Malibu'],        intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,200,200,.2),rgba(140,140,100,.14))' },
    { cat:'alcools', name:'Martini Blanc (verre)',emoji:'🍸',price:3000, desc:'Martini Bianco — apéritif à la vanille douce. Bouteille : 30 000 FCFA.',          ingr:['Martini Blanc'], intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,220,180,.2),rgba(200,160,80,.14))' },
    { cat:'alcools', name:'Martini Rouge (verre)',emoji:'🍷',price:3000, desc:'Martini Rosso — apéritif aux herbes et épices. Bouteille : 30 000 FCFA.',          ingr:['Martini Rouge'], intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,20,20,.2),rgba(100,0,0,.14))' },

    // ═══════════════════════════════════════
    // LIQUEURS
    // ═══════════════════════════════════════
    { cat:'liqueurs', name:'Triple Sec',        emoji:'🍊', price:2800, desc:'Triple Sec — liqueur d\'orange. Idéal pour les cocktails ou à siroter.',                        ingr:['Triple Sec'],     intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,140,20,.2),rgba(180,80,0,.14))' },
    { cat:'liqueurs', name:'Get 27 (verre)',     emoji:'🌿', price:3000, desc:'Get 27 menthe — glacial et rafraîchissant. Bouteille disponible : 33 000 FCFA.',                 ingr:['Get 27'],         intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(20,180,60,.2),rgba(0,100,30,.14))' },
    { cat:'liqueurs', name:'Bailey\'s (verre)',  emoji:'☕', price:3500, desc:'Bailey\'s Irish Cream — onctueux et crémeux. Bouteille disponible : 38 000 FCFA.',               ingr:['Bailey\'s'],      intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,100,40,.22),rgba(100,60,10,.15))' },
    { cat:'liqueurs', name:'Get 31 (verre)',     emoji:'🌿', price:3000, desc:'Get 31 — menthe poivrée plus forte. Bouteille disponible : 35 000 FCFA.',                        ingr:['Get 31'],         intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(20,160,60,.2),rgba(0,80,30,.14))' },
    { cat:'liqueurs', name:'Jägermeister',       emoji:'🦌', price:4500, desc:'Jägermeister — liqueur herbacée allemande à 56 plantes. À boire très froid.',                   ingr:['Jägermeister'],   intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(20,60,20,.25),rgba(10,30,10,.18))' },
    { cat:'liqueurs', name:'Cointreau',          emoji:'🍊', price:4500, desc:'Cointreau — liqueur d\'orange triple sec premium. Idéal en cocktail ou pur.',                   ingr:['Cointreau'],      intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,120,20,.2),rgba(180,60,0,.14))' },
    { cat:'liqueurs', name:'Grand Marnier',      emoji:'🍊', price:5000, desc:'Grand Marnier — cognac et orange amère. L\'élégance française.',                                 ingr:['Grand Marnier'],  intensity:3, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,20,.22),rgba(140,50,0,.15))' },

    // ═══════════════════════════════════════
    // DIGESTIFS
    // ═══════════════════════════════════════
    { cat:'digestifs', name:'Courvoisier (verre)',      emoji:'🥃', price:6000,  desc:'Courvoisier VS — cognac classique. Bouteille disponible : 70 000 FCFA.',                     ingr:['Courvoisier'],      intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,100,20,.22),rgba(100,50,0,.15))' },
    { cat:'digestifs', name:'Peyrat VSOP (verre)',      emoji:'🥃', price:8000,  desc:'Cognac Peyrat VSOP — fin et élégant. Bouteille disponible : 100 000 FCFA.',                  ingr:['Peyrat VSOP'],      intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,120,30,.22),rgba(120,70,0,.15))' },
    { cat:'digestifs', name:'Hennessy (verre)',         emoji:'🥃', price:7000,  desc:'Hennessy VS — le cognac de référence. Bouteille disponible : 90 000 FCFA.',                   ingr:['Hennessy VS'],      intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(160,80,10,.24),rgba(100,40,0,.17))' },
    { cat:'digestifs', name:'Hennessy Extra Old (verre)',emoji:'🥃',price:20000, desc:'Hennessy Extra Old — notes boisées et florales d\'une rare complexité.',                      ingr:['Hennessy XO'],      intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(140,60,10,.28),rgba(80,20,0,.22))' },
    { cat:'digestifs', name:'Hennessy XO (bouteille)',  emoji:'🍾', price:30000, desc:'Hennessy XO — coffret bouteille complète. Le summum du cognac Hennessy.',                     ingr:['Hennessy XO'],      intensity:4, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(120,50,10,.28),rgba(60,15,0,.22))' },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }
  console.log(`✅ ${menuItems.length} items menu créés`);

  // ── 20 TABLES ───────────────────────────────────────
  for (let i = 1; i <= 20; i++) {
    await prisma.table.upsert({
      where: { number: i },
      update: {},
      create: { number: i, active: false, currentOrderId: '' }
    });
  }
  console.log('✅ 20 tables créées');

  console.log('\n🎉 Base de données prête !');
  console.log('   Admin : admin@bahia.sn');
  console.log('   Pass  : bahia2025');
  console.log(`   Menu  : ${menuItems.length} items répartis en 19 catégories`);
}

main()
  .catch(e => { console.error('❌ Erreur seed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
