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
    { cat:'cocktails', name:'Bahia Sunset',           emoji:'🍹', price:4500,  desc:'Rhum blanc, mangue fraîche, citron vert, gingembre, sirop de canne. La signature absolue du Bahia.',    ingr:['Rhum blanc','Mangue','Citron vert','Gingembre','Sirop canne'], intensity:3, ar:true,  isNew:false, grad:'linear-gradient(135deg,rgba(255,100,0,.2),rgba(200,30,60,.14))' },
    { cat:'cocktails', name:'Atlantic Blue',           emoji:'🌊', price:5000,  desc:'Vodka premium, curaçao bleu, pamplemousse rosé, eau de coco. Mystérieux et profond.',                   ingr:['Vodka','Curaçao bleu','Pamplemousse','Eau de coco'],           intensity:3, ar:true,  isNew:false, grad:'linear-gradient(135deg,rgba(0,140,200,.2),rgba(10,50,140,.14))' },
    { cat:'cocktails', name:'Dakar Sour',              emoji:'🌴', price:5500,  desc:'Whisky single malt, jus de bissap maison, citron, blanc d\'œuf fouetté. Puissant et élégant.',          ingr:['Whisky','Bissap','Citron','Blanc d\'œuf'],                     intensity:4, ar:true,  isNew:false, grad:'linear-gradient(135deg,rgba(180,20,80,.2),rgba(100,10,60,.14))' },
    { cat:'cocktails', name:'Baobab Fizz',             emoji:'🫐', price:4800,  desc:'Gin artisanal, jus de baobab, tonic premium, basilic frais. Le terroir sénégalais en verre.',           ingr:['Gin','Jus baobab','Tonic','Basilic'],                          intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(60,160,90,.18),rgba(20,80,60,.12))' },
    { cat:'cocktails', name:'Teranga Spritz',          emoji:'🍊', price:4200,  desc:'Aperol, prosecco, orange sanguine, menthe. L\'hospitalité sénégalaise en bulles.',                      ingr:['Aperol','Prosecco','Orange sanguine','Menthe'],                intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(255,90,10,.18),rgba(220,160,30,.12))' },
    { cat:'cocktails', name:'Nuit de Gorée',           emoji:'🍸', price:6000,  desc:'Tequila, mezcal, hibiscus infusé, jalapeño, sel de mer. Pour les âmes aventureuses.',                  ingr:['Tequila','Mezcal','Hibiscus','Jalapeño','Sel de mer'],         intensity:5, ar:true,  isNew:true,  grad:'linear-gradient(135deg,rgba(160,10,140,.2),rgba(80,0,80,.14))' },
    { cat:'entrees',   name:'Accras de Morue',         emoji:'🐟', price:3500,  desc:'Beignets croustillants à la morue salée, sauce chien, citron vert. La mer en bouchée.',                ingr:['Morue salée','Farine','Piment','Herbes'],                      intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(180,140,60,.18),rgba(100,70,20,.12))' },
    { cat:'entrees',   name:'Salade Avocat Crevettes', emoji:'🥗', price:4200,  desc:'Avocat, crevettes grillées, vinaigrette citron-gingembre, roquette, sésame.',                          ingr:['Avocat','Crevettes','Citron','Gingembre','Roquette'],          intensity:0, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(80,160,80,.17),rgba(30,100,50,.12))' },
    { cat:'entrees',   name:'Soupe de Poisson',        emoji:'🍲', price:3800,  desc:'Bouillon de poisson frais, légumes du marché, épices douces, pain croustillant.',                      ingr:['Poisson frais','Légumes','Épices','Tomates'],                  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,100,40,.17),rgba(140,60,20,.12))' },
    { cat:'plats',     name:'Thiéboudienne',           emoji:'🍛', price:7500,  desc:'Le plat national — riz rouge au poisson, légumes du marché, sauce tomate. Incontournable.',            ingr:['Riz brisé','Poisson','Tomates','Légumes','Épices'],            intensity:0, ar:true,  isNew:false, grad:'linear-gradient(135deg,rgba(220,80,20,.2),rgba(160,40,10,.14))' },
    { cat:'plats',     name:'Poulet Yassa',            emoji:'🍗', price:6800,  desc:'Poulet mariné au citron, oignons caramélisés, olives, moutarde. Tradition revisitée.',                 ingr:['Poulet','Citron','Oignons','Moutarde','Olives'],               intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,160,40,.18),rgba(160,100,20,.12))' },
    { cat:'plats',     name:'Poisson Braisé',          emoji:'🐠', price:8500,  desc:'Poisson entier braisé au charbon, marinade d\'herbes et citron, légumes grillés.',                     ingr:['Poisson entier','Herbes','Citron','Légumes'],                  intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(30,140,180,.17),rgba(10,80,120,.12))' },
    { cat:'plats',     name:'Brochettes Mixtes',       emoji:'🍢', price:7000,  desc:'Bœuf et poulet marinés, légumes grillés, sauce arachide maison. Généreux et savoureux.',               ingr:['Bœuf','Poulet','Légumes','Sauce arachide'],                    intensity:0, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(160,60,20,.18),rgba(100,30,10,.12))' },
    { cat:'desserts',  name:'Fondant Chocolat',        emoji:'🍫', price:3500,  desc:'Fondant au chocolat noir, cœur coulant, glace vanille de Madagascar, coulis de mangue.',               ingr:['Chocolat noir','Œufs','Beurre','Vanille','Mangue'],            intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(80,40,10,.25),rgba(40,15,5,.2))' },
    { cat:'desserts',  name:'Salade de Fruits',        emoji:'🍍', price:2800,  desc:'Mangue, papaye, ananas, pastèque — fruits tropicaux frais, menthe, citron, hibiscus.',                 ingr:['Mangue','Papaye','Ananas','Pastèque','Hibiscus'],              intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,160,30,.17),rgba(180,80,60,.12))' },
    { cat:'desserts',  name:'Thiakry Glacé',           emoji:'🍮', price:3200,  desc:'Thiakry traditionnel revisité, servi froid, crème parfumée, noix de cajou grillées.',                  ingr:['Mil','Yaourt','Sucre vanillé','Cajou'],                        intensity:0, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(240,200,120,.17),rgba(180,140,60,.1))' },
    { cat:'soft',      name:'Cocktail Bissap',         emoji:'🌺', price:2500,  desc:'Infusion d\'hibiscus, gingembre, citron vert, menthe, eau pétillante.',                               ingr:['Bissap','Gingembre','Citron vert','Menthe'],                   intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(200,40,80,.17),rgba(120,10,60,.12))' },
    { cat:'soft',      name:'Bouye Ice',               emoji:'🥛', price:2800,  desc:'Pain de singe (baobab) glacé, lait de coco, vanille de Madagascar. Onctueux et exotique.',             ingr:['Jus baobab','Lait de coco','Vanille','Glace'],                 intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,180,100,.16),rgba(160,110,50,.1))' },
    { cat:'soft',      name:'Citronnade Maison',       emoji:'🍋', price:2000,  desc:'Citrons pressés, eau pétillante, sirop de menthe, gingembre. Classique et rafraîchissant.',            ingr:['Citron','Menthe','Gingembre','Pétillant'],                     intensity:0, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(220,200,40,.16),rgba(160,140,10,.1))' },
    { cat:'vins',      name:'Rosé de Provence',        emoji:'🥂', price:4000,  desc:'Sélection de rosés de Provence, frais et floraux. Le compagnon parfait du coucher de soleil.',        ingr:['Rosé de Provence'],                                           intensity:2, ar:false, isNew:false, grad:'linear-gradient(135deg,rgba(240,140,140,.14),rgba(200,80,100,.1))' },
    { cat:'vins',      name:'Champagne Maison',        emoji:'🍾', price:12000, desc:'Champagne brut sélection, servi frais. Pour les grandes occasions face à l\'Atlantique.',              ingr:['Champagne brut'],                                             intensity:3, ar:false, isNew:true,  grad:'linear-gradient(135deg,rgba(212,168,71,.2),rgba(160,120,40,.12))' },
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
}

main()
  .catch(e => { console.error('❌ Erreur seed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());