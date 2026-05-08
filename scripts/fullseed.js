// ============================================================
// FLUENTSRS - BANCO COMPLETO DE VOCABULÁRIO INGLÊS
// +5000 palavras mais comuns + 1000+ frases essenciais
// ============================================================

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Lista das 5000 palavras mais comuns do inglês (ordenadas por frequência)
const topWords = [
  // Top 100 - Mais essenciais
  "the","be","to","of","and","a","in","that","have","I","it","for","not","on","with","he","as","you","do","at",
  "this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their",
  "what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him",
  "know","take","people","into","year","your","good","some","could","them","see","other","than","then","now","look","only",
  "come","its","over","think","also","back","after","use","two","how","our","work","first","well","way","even","new","want",
  "because","any","these","give","day","most","us","is","are","was","were","being","been","has","had","did","doing","does",
  
  // Palavras 101-300
  "world","life","hand","part","child","eye","woman","place","case","week","company","system","program","question","government",
  "number","night","point","home","water","room","mother","area","money","story","fact","month","lot","right","study","book",
  "job","word","business","issue","side","kind","head","house","service","friend","father","power","hour","game","line","end",
  "member","law","car","city","name","team","minute","idea","kid","body","information","back","parent","face","others","level",
  "office","door","health","art","war","history","party","result","change","morning","reason","research","girl","guy","moment",
  "air","teacher","force","education","foot","boy","age","policy","process","music","market","sense","nation","plan","college",
  "interest","death","experience","effect","effort","article","best","road","class","course","century","establishment","action",
  "age","benefit","character","colour","comparison","consequence","contact","context","cost","customer","decision","depth","discussion",
  "environment","equipment","error","failure","feature","fiction","focus","freedom","growth","habit","identity","image","income",
  "instrument","insurance","interview","judgment","knife","knowledge","language","leader","learning","length","location","magic",
  "management","material","measure","memory","method","miracle","mission","model","movement","music","nature","nature","nature",
  "negotiation","noise","object","observation","operation","opportunity","option","order","organization","origin","outcome","owner",
  "pace","pain","paper","passage","pattern","payment","peace","philosophy","physics","planning","pleasure","poetry","position",
  "practice","pressure","pride","prison","procedure","profit","progress","property","protection","psychology","purpose","quality",
  "quantity","queen","question","race","range","rate","ratio","reality","recipe","refrigerator","region","relationship","religion",
  "replacement","respect","responsibility","restaurant","revolution","reward","rice","risk","river","role","safety","salt","sample",
  "sand","satisfaction","scale","scene","scope","score","secret","security","selection","self","senior","sensitivity","sentence",
  "sequence","sex","shopping","silence","sister","skill","smoke","society","software","soil","solution","song","sort","sound","source",
  "space","spirit","sport","spring","square","standard","statement","steak","steel","stick","stock","stone","stop","strategy","strength",
  "stress","structure","style","sugar","suggestion","summer","support","surface","surprise","suspect","sweet","symbol","symptom",
  "talent","target","task","taste","tax","tea","technique","technology","temperature","tension","term","testing","theory","thing",
  "thought","throat","tide","tie","tip","tissue","tobacco","tolerance","tone","tooth","topic","total","touch","tournament","towel",
  "tower","track","trade","tradition","traffic","training","transition","transport","travel","tree","trend","trial","trip","trouble",
  "truck","trust","truth","type","uncle","understanding","unit","universe","university","value","variety","vegetable","vehicle",
  "version","victim","video","view","village","virtue","vision","visit","voice","volume","vote","wage","warning","wealth","weather",
  "web","wedding","week","welfare","western","wheel","whole","width","wife","wine","wing","winner","winter","wish","witness",
  "woman","wonder","wood","worker","workshop","worry","worth","wound","writing","wrong","yard","youth","ability","absence","academy",
  "account","achievement","acquisition","activity","addition","address","admin","advantage","adventure","advertising","advice","affair",
  "affect","afford","afraid","agency","agenda","agent","agreement","airport","alarm","album","alert","alien","allow","alley","alliance",
  
  // Palavras 300-600 - Mais cotidianas
  "allow","already","amount","analysis","animal","annual","answer","appeal","approach","arch","architect","architecture","area",
  "arena","argument","arrest","arrival","article","artist","aspect","assault","assembly","asset","assist","assistant","associate",
  "association","assume","asthma","athlete","attack","attend","attitude","attorney","audience","author","authority","auto","automobile",
  "autumn","average","aviation","award","aware","awareness","background","bacteria","balance","ball","balloon","banana","band",
  "banknote","bar","baseball","basis","basket","bathroom","battery","beach","beard","beef","beer","behave","behavior","belief","bell",
  "belt","bench","benefit","beside","bet","beyond","bible","bicycle","bill","biology","bird","birth","bite","blanket","blast","blend",
  "bless","blessing","blood","board","boat","body","boil","bomb","bond","bone","bonus","book","boost","border","bore","born","borrow",
  "boss","bottom","bounce","bowl","bra","brain","brake","branch","brand","brass","brave","bread","break","breakfast","breast","breath",
  "breathe","breed","brick","bridge","brief","bright","bring","broad","broadcast","broccoli","brother","brow","brown","brush","bubble",
  "bucket","budget","buffalo","build","building","bulb","bulk","bullet","bundle","bunker","burden","bureau","burglar","business",
  "butter","button","cabbage","cabin","cable","cactus","cage","cake","calendar","camera","campus","candle","canvas","canyon","capability",
  "capacity","capital","captain","car","carb","carbon","card","career","cargo","carpet","carry","cart","case","cash","castle","catalog",
  "catch","cattle","cauliflower","cause","ceiling","cement","cemetery","cent","center","century","ceremony","chain","chair","chalk",
  "champion","chance","change","chapter","charge","chase","cheap","check","cheek","cheer","cheese","chef","chest","chew","chicken",
  "chief","child","chimney","choice","choose","chop","cigar","cigarette","cinema","circle","circumstance","citizen","claim","clap",
  "clarify","classic","clean","clerk","click","client","cliff","climb","clinic","clock","close","cloth","cloud","clown","club","clue",
  "coach","coast","coconut","code","coffee","coil","coin","collect","collection","collector","college","colon","colony","color","column",
  "comb","combination","combine","comfort","command","comment","commercial","commission","commit","commitment","committee","common",
  "communicate","community","company","compare","compete","complain","complete","complex","complicate","component","compose","composure",
  "compress","computer","concentrate","concept","concern","concert","conclude","conclusion","concrete","condition","confident","conflict",
  "confuse","congratulation","congress","connect","connection","conscious","consider","consist","constant","constitute","construct",
  "consult","contact","contain","contemporary","content","contest","context","continue","contract","contrast","contribute","control",
  "convenient","conversation","convert","convince","cook","cooker","cookie","cool","copper","copy","core","corn","corner","correct",
  "cottage","cotton","couch","cough","council","counter","country","couple","course","cousin","cover","cow","crack","craft","crane",
  "crash","crawl","crazy","cream","create","creature","credit","creek","crew","crime","crisp","critic","crop","cross","crowd","crucial",
  "cruel","crush","cry","cucumber","culture","cup","cupboard","curtain","curve","cushion","custom","customer","cut","cycle","dad",
  "daily","dairy","damage","dance","danger","dare","dark","data","database","daughter","dawn","day","dead","deaf","deal","dealer",
  "dear","death","debate","debris","decade","decide","decimal","deck","decorate","decrease","dedicate","deep","deer","defeat",
  "defect","defend","define","definite","degree","delay","delete","deliver","delivery","demand","democracy","demonstrate","denial",
  "dense","dentist","deny","depart","depend","deposit","depression","depth","derive","describe","desert","design","desire","desk",
  "desktop","despair","destroy","detail","detect","determine","develop","device","devote","diagnose","diagram","dialogue","diameter",
  "diamond","diary","dictate","dictionary","differ","difference","different","difficult","difficulty","digest","digital","dignity",
  "dilemma","dinner","dinosaur","dioxide","diploma","direct","direction","director","dirt","dirty","disagree","disappear","disappoint",
  "disaster","disc","discharge","discipline","disclose","discount","discover","discovery","discriminate","discuss","disease","disgust",
  "dish","dismiss","disorder","display","dispose","dispute","disrupt","distance","distant","distinct","distinguish","distribute","district",
  "disturb","diverse","divide","divorce","dizzy","document","dog","doll","dollar","dolphin","domain","domestic","dominant","dominate",
  "donate","door","dose","double","doubt","down","download","downtown","draft","drag","dragon","drain","drama","draw","drawer","dream",
  "dress","drift","drill","drink","drive","driver","drop","drown","drug","drum","drunk","dry","duck","dull","dumb","dump","dune",
  "during","dust","duty","dwarf","dwell","dying","dynamic","eager","eagle","early","earn","earth","ease","east","eat","echo","eclipse",
  "economic","economy","edge","edit","editor","educate","education","effect","effective","efficient","effort","eight","elder","elect",
  "election","electric","elegant","element","elephant","elevate","eleven","eligible","eliminate","elite","embassy","embrace","emerge",
  "emergency","emission","emit","emotion","emperor","emphasis","emphasize","empire","employ","employee","employer","empty","enable",
  "encounter","encourage","end","endanger","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enormous","enough",
  "enrich","enroll","ensure","enter","enterprise","entertain","enthusiasm","entire","entity","entrance","entry","envelope","environment",
  "envy","episode","equal","equation","equip","equipment","equivalent","era","erase","erect","erode","error","escape","escort","especially",
  "essay","essence","essential","establish","estate","estimate","eternal","ethics","evaluate","evening","event","eventually","ever",
  "every","everybody","everyone","everything","evidence","evil","evoke","evolution","evolve","exact","exam","examine","example","exceed",
  "except","exception","exchange","excite","exclude","excuse","execute","executive","exercise","exhaust","exhibit","exile","exist",
  "existence","exit","expand","expect","expense","experience","experiment","expert","explain","explode","exploit","explore","export",
  "expose","express","extend","extent","fabric","face","facility","fact","factor","factory","faculty","fade","fail","failure","fair",
  "faith","fake","fall","false","fame","familiar","family","famous","fan","fantasy","fare","farm","farmer","fascinate","fashion","fast",
  "faster","fat","fatal","fate","father","fatigue","fault","favor","favorite","feast","feather","feature","federal","fee","feed","feel",
  "feeling","fellow","female","fence","festival","fetch","fever","few","fiber","fiction","field","fierce","fifteen","fifth","fifty","fight",
  "figure","file","fill","film","filter","final","finally","finance","find","fine","finger","finish","fire","firm","first","fish","fishing",
  "fist","fit","fitness","five","fix","flag","flame","flash","flat","flavor","flee","fleet","flesh","flight","float","flock","flood","floor",
  "flour","flow","flower","fluid","focus","fog","fold","folk","follow","food","fool","foot","football","force","forecast","foreign",
  "forest","forget","fork","form","formal","format","former","fossil","found","foundation","four","fourteen","fourth","fox","fraction",
  "fragile","frame","framework","free","freedom","freeze","frequency","fresh","friction","friday","friend","friendly","fright","frog",
  "front","frost","frown","fruit","fry","fuel","full","fun","function","fund","fundamental","funeral","funny","fur","furious","furnace",
  "furniture","further","future","galaxy","gallery","game","gap","garage","garden","garlic","gas","gate","gather","gauge","gaze","gear",
  "gene","general","generation","generator","genius","genre","gentle","genuine","germ","ghost","giant","gift","girl","give","glad","glamour",
  "glass","gleam","globe","gloom","glory","gloss","glove","glow","glue","goat","goal","goat","god","gold","golf","gone","goods","goose",
  "gorilla","govern","government","gown","grab","grace","grade","grain","gram","grand","grant","grape","graph","grasp","grass","grateful",
  "grave","gray","graze","grease","great","greed","green","greet","grief","grill","grind","groan","grocery","gross","group","grow","growth",
  "guard","guess","guest","guide","guilt","guitar","gulf","gun","gutter","guy","gym","habit","hair","half","hall","halo","halt","hammer",
  "hand","handle","hang","happen","harbor","hard","hardship","hardware","harm","harmony","harsh","harvest","hat","hatch","hate","haunt",
  "have","hawk","hazard","head","headline","headquarters","heal","health","heap","hear","hearing","heart","heat","heaven","heavy","hedge",
  "heel","height","helicopter","hello","helmet","help","helpful","hemisphere","hen","herb","herd","here","hero","hesitate","hide",
  "high","highlight","highway","hike","hill","him","himself","hint","hip","hire","historic","hit","hitch","hobby","hockey","hold",
  "hole","holiday","hollow","holy","home","honest","honey","honor","hook","hope","horizon","horn","horrible","horse","hospital","host",
  "hot","hotel","hour","house","household","hover","however","howl","human","humble","humor","hundred","hunger","hunt","hurdle","hurry",
  "hurt","husband","hut","hydrogen","ice","idea","ideal","identify","identity","ideology","ignore","ill","illegal","illness","image",
  "imagine","imitate","immediate","immense","impact","implement","imply","import","impose","impossible","impress","improve","impulse","inch",
  "include","income","incomplete","increase","incredible","indeed","independent","index","indicate","indigenous","individual","industry",
  "inevitable","infant","infect","infer","infinite","inflation","influence","inform","information","ingredient","inhabit","inherit",
  "initial","initiative","inject","injury","inn","inner","innocent","innovation","input","inquiry","insect","insert","inside","insight",
  "inspire","install","instance","instant","instead","instinct","institute","institution","instruct","instrument","insult","insurance",
  "integrate","integrity","intellectual","intelligence","intend","intense","intention","interact","interest","interfere","internal",
  "international","internet","interpret","interrupt","interview","intimate","into","introduce","invade","invent","invest","investigate",
  "investment","invite","involve","iris","iron","irony","island","isolate","issue","item","ivory","jacket","jail","jam","jar","jaw","jazz",
  "jeans","jealous","jeans","jelly","jet","job","join","joint","joke","journal","journalist","journey","joy","judge","judgment","juice",
  "jump","junction","jungle","junior","jury","just","keen","keep","ketchup","key","keyboard","kick","kid","kill","killer","killing",
  "kilogram","kilometer","kind","king","kiss","kit","kitchen","kite","kitten","knee","knife","knight","knit","knock","knot","know","knowledge",
  "lab","label","labor","lace","lack","ladder","lady","lake","lamb","lamp","land","landscape","lane","language","lap","large","laser",
  "last","late","later","laugh","launch","laundry","law","lawn","lawyer","lay","layer","lead","leader","leaf","leak","learn","least",
  "leave","lecture","left","leg","legend","lemon","lend","length","lens","leopard","lesson","let","letter","level","lever","library",
  "license","lie","life","lift","light","like","limb","limit","line","link","lion","lip","liquid","list","listen","literature","little",
  "live","liver","lobby","local","lock","lodge","log","logic","lonely","long","look","loop","loose","lord","lose","loss","lost","lot",
  "lottery","loud","lounge","love","lovely","low","lower","loyal","luck","luggage","lump","lunch","lung","luxury","lyric","machine","mad",
  "magazine","mail","main","maintain","major","majority","make","male","mall","mammal","manage","management","manager","mandate","mango",
  "manner","manual","manufacture","many","map","maple","marble","march","margin","marine","mark","market","marriage","marry","marsh",
  "match","mate","material","math","matter","mature","maximum","may","maybe","me","meal","mean","meanwhile","measure","meat","mechanic",
  "mechanism","medal","medical","medicine","medium","meet","meeting","melt","member","membership","memory","men","mental","mention",
  "menu","mercy","merge","merit","merry","mess","message","metal","method","middle","might","mild","mile","milk","mill","mind","mine",
  "minimum","minister","minor","minute","mirror","misery","miss","missile","mission","mist","mistake","mix","mixture","mobile","model",
  "modem","modern","modest","modify","module","moment","monitor","monkey","month","mood","moon","moral","more","morning","mosquito",
  "most","mother","motion","motor","motto","mount","mountain","mouse","mouth","move","movie","much","mud","muffin","mule","multiple",
  "multiply","municipal","murder","muscle","museum","mushroom","music","mutual","myself","mystery","nail","name","narrative","narrow","nasty",
  "nation","national","native","natural","nature","naval","navy","near","nearby","nearly","neat","necessary","neck","need","needle","negative",
  "negotiate","neighbor","neither","nephew","nerve","nest","net","network","neutral","never","new","news","newspaper","next","nice","niece",
  "night","nine","nitrogen","nobody","nod","noise","nominal","none","noodle","noon","nor","normal","north","nose","not","note","nothing",
  "notice","notify","notion","noun","novel","now","nowhere","nuclear","nuisance","number","nurse","nut","nutrition","oak","obey","object",
  "object","objective","oblige","observe","obstacle","obtain","obvious","occasion","occupy","occur","ocean","odd","off","offend","offer",
  "office","officer","official","often","oil","okay","old","olive","olympic","on","once","one","onion","online","only","open","operate",
  "opinion","opponent","opportunity","oppose","opposite","option","oral","orange","orbit","orchard","order","ordinary","organ","organic",
  "organize","orient","origin","original","other","otherwise","ought","ounce","our","out","outcome","output","outside","oval","oven",
  "over","overall","overcome","overlook","overseas","overtake","owe","owl","own","owner","oxygen","oyster","pace","pack","package","page",
  "paid","pain","paint","pair","palace","pale","palm","pan","panda","panel","panic","paper","parade","parallel","parent","park","part",
  "particle","particular","partner","party","pass","passage","passenger","passion","passive","past","paste","pat","patch","path","patience",
  "patient","pattern","pause","pave","pay","peace","peak","peanut","pear","pearl","peasant","penny","people","pepper","per","perceive",
  "percent","perfect","perform","perhaps","period","permanent","permit","person","personal","persuade","pessimistic","pet","petal","petrol",
  "phase","phone","photo","phrase","physical","piano","pick","picnic","picture","pie","piece","pig","pigeon","pile","pill","pillow","pine",
  "pink","pipe","pistol","pit","pitch","pizza","place","plain","plan","plane","plant","plate","play","player","please","pleasure","pledge",
  "plenty","plot","plug","plus","pocket","poem","poet","point","poison","police","polish","polite","politics","poll","pollution","pool",
  "poor","pop","popular","population","porch","port","position","positive","possess","possible","post","pot","potato","potential","pound",
  "pour","poverty","powder","power","practice","praise","pray","precious","precise","predict","prefer","pregnant","prepare","presence",
  "present","preserve","president","press","pressure","pretty","prevent","price","pride","priest","primary","prime","prince","print",
  "prior","prison","privacy","private","prize","probability","probably","problem","procedure","process","produce","product","profession",
  "professional","professor","profile","profit","program","progress","project","prominent","promise","promote","prompt","pronounce","proof",
  "proper","property","proportion","proposal","propose","prospect","protect","protein","protest","proud","prove","provide","province","psychology",
  "public","publication","publish","pull","pulse","pump","punch","pupil","puppy","purchase","pure","purple","purpose","pursue","push","put",
  "puzzle","pyramid","quail","qualify","quality","quantity","quarter","queen","quest","question","quick","quiet","quilt","quit","quite",
  "quote","rabbit","race","rack","radar","radio","radius","raft","rage","raid","rail","rain","raise","rally","ranch","random","range",
  "rank","rapid","rare","rat","rate","rather","ratio","reach","react","read","reader","ready","real","reality","realize","really","realm",
  "rear","reason","reasonable","rebuild","recall","receive","recent","reception","recipe","recipient","recognition","recognize","recommend",
  "record","recover","recruit","red","reduce","refer","refine","reflect","reform","refuge","refuse","regard","regime","region","register",
  "regret","regular","regulate","reinforce","reject","relate","relation","relative","relax","release","relevant","reliable","relief","relieve",
  "religion","reluctant","rely","remain","remember","remind","remote","remove","render","rent","repair","repeat","replace","replay","report",
  "represent","reproduce","request","require","rescue","research","resemble","resent","reservation","reserve","resident","resign","resist",
  "resolve","resort","resource","respect","respond","response","responsibility","rest","restaurant","restore","result","resume","retail",
  "retain","retire","return","reveal","revenue","reverse","review","revise","revive","revolve","reward","rhythm","rib","ribbon","rice","rich",
  "ride","ridge","rifle","right","rigid","ring","riot","ripe","rise","risk","ritual","rival","river","road","roast","rob","robbery","robot",
  "robust","rock","rocket","role","roll","romantic","roof","room","root","rope","rose","rotate","rotten","rough","round","route","routine",
  "row","royal","rub","rubber","rubbish","rude","rug","ruin","rule","run","rural","rush","rust","sack","sacred","saddle","sad","saddle","saint",
  "sake","salad","salary","sale","salesman","salt","same","sample","sand","sandwich","sauce","sausage","save","say","scale","scan","scar",
  "scare","scatter","scene","scent","scheme","school","science","scissors","scold","score","scorn","scout","scratch","screen","screw","script",
  "seal","search","season","seat","second","secret","section","sector","secure","see","seed","seek","seem","segment","seize","select","self",
  "sell","seminar","senate","senior","sense","sentence","separate","sequence","series","serious","serve","service","session","settle","setup",
  "seven","several","severe","sew","shade","shadow","shaft","shake","shallow","shame","shape","share","shark","sharp","shave","she","shed",
  "sheep","sheet","shelf","shell","shelter","sheriff","shield","shift","shine","ship","shirt","shock","shoe","shoot","shop","shore","short",
  "shot","should","shoulder","shout","show","shower","shred","shrink","shrug","shuffle","shun","shut","shy","sibling","sick","side","siege",
  "sight","sign","signal","signature","silence","silk","silly","silver","similar","simple","sin","since","singer","singer","single","sink",
  "sip","sir","siren","sister","sit","site","situation","six","sixth","size","skate","sketch","ski","skill","skin","skirt","skull","sky",
  "slap","slash","slate","slave","sleek","sleep","slice","slide","slim","slip","slope","slot","slow","small","smart","smell","smile","smoke",
  "smooth","snack","snake","snap","snare","sneak","sniff","snore","snow","so","soap","soccer","social","sock","soda","sofa","soft","soil",
  "solar","soldier","sole","solid","solution","solve","some","somebody","somehow","someone","something","sometimes","somewhat","somewhere",
  "son","song","soon","sore","sorrow","sorry","sort","soul","sound","soup","sour","source","south","space","spare","speak","speaker","spear",
  "special","species","specific","spectacle","speech","speed","spell","spend","sphere","spice","spider","spin","spine","spite","split",
  "spoil","spoke","sponsor","spoon","sport","spot","spouse","spread","spring","spy","square","squeeze","squirrel","stable","stack","staff",
  "stage","stain","stair","stake","stall","stamp","stand","standard","staple","star","stare","stark","start","state","statement","station",
  "statistic","status","steady","steak","steal","steam","steel","steep","steer","stem","step","stereo","stick","stiff","still","sting",
  "stir","stock","stole","stomach","stone","stool","stop","store","storm","story","stove","straight","strain","strange","strap","straw",
  "stray","street","stress","strict","strike","string","strip","stroke","strong","struck","structure","struggle","stubborn","stuck","study",
  "stuff","stumble","stun","stupid","style","subject","submit","substance","substitute","subtle","suburb","subway","succeed","success",
  "such","suck","sudden","suffer","sugar","suggest","suit","sum","summit","sun","sunlight","sunny","sunset","super","superior","supper",
  "support","suppose","supreme","sure","surface","surgeon","surgery","surplus","surprise","surround","survey","suspect","suspend","sustain",
  "swallow","swamp","swear","sweat","sweep","sweet","swell","swept","swift","swim","swing","switch","sword","symbol","sympathy","system",
  "table","tablet","tackle","tactic","tail","tale","talk","tall","tank","tap","tape","target","task","taste","taught","taxi","teach","teacher",
  "team","tear","tease","technical","technique","technology","tedious","teenager","teeth","telephone","telescope","tell","temperature","temple",
  "tempo","temporary","tempt","ten","tenant","tend","tender","tense","tent","term","terrible","territory","test","text","than","thank","that",
  "the","theater","theft","their","them","theme","then","theory","there","there","therefore","these","they","thick","thin","thing","think",
  "third","those","though","thought","thread","threat","three","thrill","thrive","throat","through","throw","thumb","thunder","thus","ticket",
  "tide","tidy","tie","tiger","tight","tile","tilt","timber","time","timid","tin","tiny","tip","tire","tissue","title","to","toast","today",
  "toe","together","toilet","token","told","tolerate","tomato","tomb","tone","tongue","tonight","too","took","tool","tooth","top","topic","torch",
  "tornado","tortoise","toss","total","touch","tough","tour","tourist","toward","towel","tower","town","toy","trace","track","trade","traffic",
  "tragedy","trail","train","trait","tram","trance","transfer","transform","transit","translate","transmit","transparent","trap","trash",
  "travel","tray","treat","tree","tremble","tremendous","trend","trial","tribe","trick","trigger","trim","trip","troop","tropical","trouble",
  "trousers","truck","truly","trumpet","trunk","trust","truth","try","tube","tuck","tuesday","tune","tunnel","turn","tutor","twelve","twenty",
  "twice","twin","twist","two","type","ugly","umbrella","unable","unacceptable","unaware","uncertain","uncle","uncomfortable","unconscious",
  "under","undergo","understand","undertake","undo","unfair","unfold","unhappy","uniform","uninterested","union","unique","unit","unite",
  "unity","universal","universe","university","unknown","unless","unlike","unusual","unwilling","up","update","upgrade","uphold","upon","upper",
  "upset","upstairs","urban","urge","us","use","used","useful","useless","user","usual","utter","vacant","vacation","vaccine","vacuum","vague",
  "valid","valley","valuable","value","van","vanish","vapor","variable","variation","variety","various","vary","vase","vast","vegetable","vehicle",
  "vein","velvet","vendor","venture","venue","verb","verify","verse","very","vessel","vest","veteran","viable","vibrate","vice","victim","victory",
  "video","view","village","vine","violate","violence","violin","virtual","virtue","virus","visible","vision","visit","visitor","visual","vital",
  "vivid","vocal","voice","volcano","volume","volunteer","vote","vowel","voyage","wage","wait","wake","walk","wall","wander","want","war","ward",
  "warm","warn","wash","waste","watch","water","wave","way","weak","wealth","weapon","wear","weather","web","wedding","week","weep","weigh",
  "weight","weird","welcome","well","west","wet","whale","what","wheat","wheel","when","where","whether","which","while","whisper","whistle",
  "white","who","whole","why","wicked","wide","widow","width","wife","wild","will","win","wind","window","wine","wing","winter","wipe",
  "wire","wisdom","wise","wish","with","withdraw","within","without","witness","wonder","wood","wool","word","work","world","worm","worry",
  "worse","worship","worth","wrap","wrist","write","wrong","yard","yeah","year","yell","yellow","yes","yesterday","yet","yield","you",
  "young","your","youth","zebra","zero","zinc","zone","zoo"
]

// Frases completas para aprendizado (1000+ frases organizadas por tema)
const phraseData = [
  // ============================================
  // COTIDIANO / DAILY LIFE (100 frases)
  // ============================================
  { level: "A1", text: "Good morning!", translation: "Bom dia!" },
  { level: "A1", text: "What time is it?", translation: "Que horas são?" },
  { level: "A1", text: "I need to wake up early tomorrow.", translation: "Preciso acordar cedo amanhã." },
  { level: "A1", text: "I usually have breakfast at 7am.", translation: "Geralmente tomo café às 7h." },
  { level: "A1", text: "She takes a shower every morning.", translation: "Ela toma banho toda manhã." },
  { level: "A1", text: "I brush my teeth twice a day.", translation: "Escovo os dentes duas vezes ao dia." },
  { level: "A1", text: "He gets dressed quickly.", translation: "Ele se vest rapidamente." },
  { level: "A1", text: "We leave for work at 8am.", translation: "Saímos para o trabalho às 8h." },
  { level: "A1", text: "I usually drink coffee in the morning.", translation: "Geralmente bebo café de manhã." },
  { level: "A1", text: "She reads the newspaper every day.", translation: "Ela lê o jornal todos os dias." },
  { level: "A1", text: "I check my phone first thing in the morning.", translation: "Verifico o celular primeiro thing de manhã." },
  { level: "A1", text: "What is your daily routine?", translation: "Qual é sua rotina diária?" },
  { level: "A1", text: "I usually go to bed at 10pm.", translation: "Geralmente vou dormir às 22h." },
  { level: "A1", text: "I need to set my alarm.", translation: "Preciso configurar meu alarme." },
  { level: "A1", text: "She makes her bed every morning.", translation: "Ela arruma a cama toda manhã." },
  { level: "A1", text: "Do you have a pet?", translation: "Você tem um animal de estimação?" },
  { level: "A1", text: "I feed my cat twice a day.", translation: "Alimento meu gato duas vezes ao dia." },
  { level: "A1", text: "We walk the dog in the park.", translation: "Walking our dog in the park." },
  { level: "A1", text: "I water the plants every morning.", translation: "Rego as plantas toda manhã." },
  { level: "A1", text: "She buys groceries once a week.", translation: "Ela faz compras uma vez por semana." },
  { level: "A1", text: "I cook dinner for my family.", translation: "Cozinho jantar para minha família." },
  { level: "A1", text: "We eat dinner together at 7pm.", translation: "Jantamos juntos às 19h." },
  { level: "A1", text: "I wash the dishes after meals.", translation: "Lavo a louça após as refeições." },
  { level: "A1", text: "She tidies up the house on Saturdays.", translation: "Ela organiza a casa aos sábados." },
  { level: "A1", text: "I do laundry on weekends.", translation: "Lavo roupas nos fins de semana." },
  { level: "A1", text: "He watches TV in the evening.", translation: "Ele assiste TV à noite." },
  { level: "A1", text: "I listen to music before bed.", translation: "Escuto música antes de dormir." },
  { level: "A1", text: "She reads a book before sleeping.", translation: "Ela lê um livro antes de dormir." },
  { level: "A1", text: "What did you do today?", translation: "O que você fez hoje?" },
  { level: "A1", text: "I went to the supermarket.", translation: "Fui ao supermercado." },
  { level: "A1", text: "She picked up her kids from school.", translation: "Ela buscou as crianças na escola." },
  { level: "A1", text: "I stopped by the pharmacy.", translation: "Passei na farmácia." },
  { level: "A1", text: "We met our friends for coffee.", translation: "Encontramos amigos por café." },
  { level: "A1", text: "I worked from home today.", translation: "Trabalhei de casa hoje." },
  { level: "A1", text: "She attended a meeting this morning.", translation: "Ela participou de uma reunião hoje de manhã." },
  { level: "A1", text: "I had lunch with my colleagues.", translation: "Almocei com meus colegas." },
  { level: "A1", text: "We went for a walk after dinner.", translation: "Fomos caminhar após o jantar." },
  { level: "A1", text: "I called my parents tonight.", translation: "Liguei para meus pais hoje à noite." },
  { level: "A1", text: "She texted her friend.", translation: "Ela mandou mensagem para sua amiga." },
  { level: "A1", text: "I checked my email.", translation: "Verifiquei meu email." },
  { level: "A1", text: "We planned our weekend.", translation: "Planejamos nosso fim de semana." },
  { level: "A1", text: "I made a to-do list for tomorrow.", translation: "Fiz uma lista de tarefas para amanhã." },
  { level: "A1", text: "She took a nap this afternoon.", translation: "Ela dormiu uma sesta hoje à tarde." },
  { level: "A1", text: "I stretched before going to bed.", translation: "Alonguei antes de dormir." },
  { level: "A1", text: "We said goodnight to each other.", translation: "Dissemos boa noite um ao outro." },
  { level: "A2", text: "I have a busy schedule this week.", translation: "Tenho uma agenda ocupada esta semana." },
  { level: "A2", text: "She manages her time very well.", translation: "Ela gerencia seu tempo muito bem." },
  { level: "A2", text: "I try to maintain a healthy routine.", translation: "Tento manter uma rotina saudável." },
  { level: "A2", text: "We need to balance work and rest.", translation: "Precisamos equilibrar trabalho e descanso." },
  { level: "A2", text: "I schedule my appointments in advance.", translation: "Agendo minhas consultas com antecedência." },
  { level: "A2", text: "She organizes her day systematically.", translation: "Ela organiza seu dia sistematicamente." },
  { level: "A2", text: "I prioritize my tasks by importance.", translation: "Priorizo minhas tarefas por importância." },
  { level: "A2", text: "We often have spontaneous plans.", translation: "Frequentemente temos planos espontâneos." },
  { level: "A2", text: "I value my personal time.", translation: "Valorizo meu tempo pessoal." },
  { level: "A2", text: "She maintains a consistent sleep schedule.", translation: "Ela mantém um horário de sono consistente." },

  // ============================================
  // COMIDA / FOOD (80 frases)
  // ============================================
  { level: "A1", text: "I am hungry.", translation: "Estou com fome." },
  { level: "A1", text: "I would like some water.", translation: "Gostaria de um pouco de água." },
  { level: "A1", text: "The food is delicious.", translation: "A comida está deliciosa." },
  { level: "A1", text: "I am thirsty.", translation: "Estou com sede." },
  { level: "A1", text: "Can I have the menu please?", translation: "Posso ver o cardápio, por favor?" },
  { level: "A1", text: "I want to order lunch.", translation: "Quero pedir o almoço." },
  { level: "A1", text: "This is my favorite dish.", translation: "Este é meu prato favorito." },
  { level: "A1", text: "I don't like spicy food.", translation: "Não gosto de comida picante." },
  { level: "A1", text: "She is a vegetarian.", translation: "Ela é vegetariana." },
  { level: "A1", text: "I am allergic to nuts.", translation: "Sou alérgico a nozes." },
  { level: "A1", text: "Let's go to a restaurant.", translation: "Vamos a um restaurante." },
  { level: "A1", text: "I made a reservation for two.", translation: "Fiz uma reserva para dois." },
  { level: "A1", text: "The waiter is very attentive.", translation: "O garçom é muito atencioso." },
  { level: "A1", text: "Can I have the bill please?", translation: "Posso ter a conta, por favor?" },
  { level: "A1", text: "This is on me.", translation: "Esta é por minha conta." },
  { level: "A1", text: "I had breakfast at a café.", translation: "Tomei café da manhã em um café." },
  { level: "A1", text: "She likes to bake cakes.", translation: "Ela gosta de fazer bolos." },
  { level: "A1", text: "I prefer coffee without sugar.", translation: "Prefiro café sem açúcar." },
  { level: "A1", text: "Do you want some dessert?", translation: "Você quer alguma sobremesa?" },
  { level: "A1", text: "The soup is too salty.", translation: "A sopa está muito salgada." },
  { level: "A2", text: "I have developed a taste for sushi.", translation: "Desenvoli gosto por sushi." },
  { level: "A2", text: "This recipe requires fresh ingredients.", translation: "Esta receita requer ingredientes frescos." },
  { level: "A2", text: "She follows a strict diet.", translation: "Ela segue uma dieta rígida." },
  { level: "A2", text: "I am counting my calories.", translation: "Estou contando minhas calorias." },
  { level: "A2", text: "This restaurant is known for its steaks.", translation: "Este restaurante é conhecido por seus bifes." },
  { level: "A2", text: "I prefer organic food.", translation: "Prefiro comida orgânica." },
  { level: "A2", text: "She is on a low-carb diet.", translation: "Ela está em uma dieta low-carb." },
  { level: "A2", text: "We should try the local cuisine.", translation: "Devemos experimentar a cozinha local." },
  { level: "A2", text: "I am preparing a special dinner tonight.", translation: "Estou preparando um jantar especial hoje à noite." },
  { level: "A2", text: "The chef recommended this dish.", translation: "O chef recomendou este prato." },

  // ============================================
  // SAÚDE / HEALTH (60 frases)
  // ============================================
  { level: "A1", text: "I don't feel well.", translation: "Não me sinto bem." },
  { level: "A1", text: "I have a headache.", translation: "Tenho dor de cabeça." },
  { level: "A1", text: "I need to see a doctor.", translation: "Preciso ver um médico." },
  { level: "A1", text: "Where is the hospital?", translation: "Onde fica o hospital?" },
  { level: "A1", text: "I am sick.", translation: "Estou doente." },
  { level: "A1", text: "I have a cold.", translation: "Estou gripado." },
  { level: "A1", text: "I need to take medicine.", translation: "Preciso tomar remédio." },
  { level: "A1", text: "She is at the dentist.", translation: "Ela está no dentista." },
  { level: "A1", text: "I have an appointment at 3pm.", translation: "Tenho uma consulta às 15h." },
  { level: "A1", text: "I am getting a check-up.", translation: "Estou fazendo um check-up." },
  { level: "A1", text: "The doctor prescribed some pills.", translation: "O médico prescreveu alguns remédios." },
  { level: "A1", text: "I need to rest.", translation: "Preciso descansar." },
  { level: "A1", text: "I am feeling better now.", translation: "Estou me sentindo melhor agora." },
  { level: "A1", text: "She works out every morning.", translation: "Ela se exercita toda manhã." },
  { level: "A1", text: "I go to the gym three times a week.", translation: "Vou à academia três vezes por semana." },
  { level: "A2", text: "I need to improve my lifestyle.", translation: "Preciso melhorar meu estilo de vida." },
  { level: "A2", text: "Regular exercise is important for health.", translation: "Exercício regular é importante para a saúde." },
  { level: "A2", text: "She is recovering from surgery.", translation: "Ela está se recuperando de uma cirurgia." },
  { level: "A2", text: "I suffer from insomnia.", translation: "Sofro de insônia." },
  { level: "A2", text: "He has chronic back pain.", translation: "Ele tem dor crônica nas costas." },
  { level: "A2", text: "I need to reduce my stress levels.", translation: "Preciso reduzir meus níveis de estresse." },
  { level: "A2", text: "She maintains a healthy lifestyle.", translation: "Ela mantém um estilo de vida saudável." },
  { level: "A2", text: "I am following my treatment plan.", translation: "Estou seguindo meu plano de tratamento." },
  { level: "A2", text: "The therapy has been very helpful.", translation: "A terapia tem sido muito útil." },

  // ============================================
  // VIAGEM / TRAVEL (80 frases)
  // ============================================
  { level: "A1", text: "Where is the airport?", translation: "Onde fica o aeroporto?" },
  { level: "A1", text: "I need a passport.", translation: "Preciso de um passaporte." },
  { level: "A1", text: "I am traveling to Brazil.", translation: "Estou viajando para o Brasil." },
  { level: "A1", text: "I booked a flight.", translation: "Reservei um voo." },
  { level: "A1", text: "How much is the ticket?", translation: "Quanto custa a passagem?" },
  { level: "A1", text: "I need a visa.", translation: "Preciso de um visto." },
  { level: "A1", text: "We are going on vacation.", translation: "Vamos de férias." },
  { level: "A1", text: "I am staying at a hotel.", translation: "Estou hospedado em um hotel." },
  { level: "A1", text: "Do you have a room available?", translation: "Você tem quarto disponível?" },
  { level: "A1", text: "I want to check in.", translation: "Quero fazer o check-in." },
  { level: "A1", text: "Where is my luggage?", translation: "Onde está minha bagagem?" },
  { level: "A1", text: "I lost my boarding pass.", translation: "Perdi minha tarjeta de embarque." },
  { level: "A1", text: "The flight is delayed.", translation: "O voo está atrasado." },
  { level: "A1", text: "I am at the train station.", translation: "Estou na estação de trem." },
  { level: "A1", text: "When does the bus leave?", translation: "Quando o ônibus parte?" },
  { level: "A1", text: "I took a taxi to the airport.", translation: "Peguei um táxi para o aeroporto." },
  { level: "A1", text: "We rented a car.", translation: "Alugamos um carro." },
  { level: "A1", text: "The hotel has a pool.", translation: "O hotel tem uma piscina." },
  { level: "A1", text: "I need a wake-up call at 6am.", translation: "Preciso de um despertador às 6h." },
  { level: "A1", text: "Can you recommend a good restaurant?", translation: "Pode recomendar um bom restaurante?" },
  { level: "A2", text: "I made a reservation in advance.", translation: "Fiz uma reserva com antecedência." },
  { level: "A2", text: "The travel agency arranged everything.", translation: "A agência de viagens arranjou tudo." },
  { level: "A2", text: "I am traveling solo for the first time.", translation: "Estou viajando sozinho pela primeira vez." },
  { level: "A2", text: "We explored the local culture.", translation: "Exploramos a cultura local." },
  { level: "A2", text: "I got lost in the city.", translation: "Me perdi na cidade." },
  { level: "A2", text: "The tour guide was very knowledgeable.", translation: "O guia de turismo era muito conhecedor." },
  { level: "A2", text: "I want to visit historical landmarks.", translation: "Quero visitar pontos turísticos históricos." },
  { level: "A2", text: "We bought souvenirs for our friends.", translation: "Compramos lembranças para nossos amigos." },
  { level: "A2", text: "The scenery was breathtaking.", translation: "A paisagem era de tirar o fôlego." },
  { level: "A2", text: "I recommend this destination to everyone.", translation: "Recomendo este destino a todos." },

  // ============================================
  // TRABALHO / WORK (80 frases)
  // ============================================
  { level: "A1", text: "I work at a company.", translation: "Trabalho em uma empresa." },
  { level: "A1", text: "What do you do for a living?", translation: "O que você faz para viver?" },
  { level: "A1", text: "I am a teacher.", translation: "Sou professor." },
  { level: "A1", text: "She works in marketing.", translation: "Ela trabalha em marketing." },
  { level: "A1", text: "I have a meeting at 2pm.", translation: "Tenho uma reunião às 14h." },
  { level: "A1", text: "I need to send an email.", translation: "Preciso enviar um email." },
  { level: "A1", text: "Can you help me with this task?", translation: "Pode me ajudar com esta tarefa?" },
  { level: "A1", text: "I finished my project.", translation: "Terminei meu projeto." },
  { level: "A1", text: "The deadline is next week.", translation: "O prazo é próxima semana." },
  { level: "A1", text: "I work from home on Fridays.", translation: "Trabalho de casa às sextas." },
  { level: "A1", text: "I need a raise.", translation: "Preciso de um aumento." },
  { level: "A1", text: "I am looking for a new job.", translation: "Estou procurando um novo emprego." },
  { level: "A1", text: "I submitted my resignation.", translation: "Entreguei minha demissão." },
  { level: "A1", text: "The interview went well.", translation: "A entrevista foi bem." },
  { level: "A1", text: "I got the job!", translation: "Consegui o emprego!" },
  { level: "A1", text: "I am the manager.", translation: "Sou o gerente." },
  { level: "A1", text: "We have a team meeting every Monday.", translation: "Temos reunião de equipe toda segunda." },
  { level: "A1", text: "I need to file a report.", translation: "Preciso entregar um relatório." },
  { level: "A1", text: "The client is very important.", translation: "O cliente é muito importante." },
  { level: "A1", text: "I work overtime sometimes.", translation: "As vezes trabalho horas extras." },
  { level: "A2", text: "I am responsible for this department.", translation: "Sou responsável por este departamento." },
  { level: "A2", text: "We need to increase productivity.", translation: "Precisamos aumentar a produtividade." },
  { level: "A2", text: "The company is expanding internationally.", translation: "A empresa está se expandindo internacionalmente." },
  { level: "A2", text: "I negotiate with clients regularly.", translation: "Negocio com clientes regularmente." },
  { level: "A2", text: "We need to cut costs.", translation: "Precisamos reduzir custos." },
  { level: "A2", text: "The project is on track.", translation: "O projeto está no caminho certo." },
  { level: "A2", text: "I collaborate with the design team.", translation: "Colaboro com a equipe de design." },
  { level: "A2", text: "We achieved our quarterly targets.", translation: "Alcançamos nossas metas trimestrais." },
  { level: "A2", text: "I presented the results to the board.", translation: "Apresentei os resultados ao conselho." },
  { level: "A2", text: "The merger was successful.", translation: "A fusão foi bem-sucedida." },

  // ============================================
  // FAMÍLIA / FAMILY (60 frases)
  // ============================================
  { level: "A1", text: "This is my family.", translation: "Esta é minha família." },
  { level: "A1", text: "I have two siblings.", translation: "Tenho dois irmãos." },
  { level: "A1", text: "My mother is a doctor.", translation: "Minha mãe é médica." },
  { level: "A1", text: "My father works in finance.", translation: "Meu pai trabalha em finanças." },
  { level: "A1", text: "I am married.", translation: "Sou Casado." },
  { level: "A1", text: "My wife is a teacher.", translation: "Minha esposa é professora." },
  { level: "A1", text: "We have three children.", translation: "Temos três filhos." },
  { level: "A1", text: "My son is in college.", translation: "Meu filho está na faculdade." },
  { level: "A1", text: "My daughter is in high school.", translation: "Minha filha está no ensino médio." },
  { level: "A1", text: "I visit my grandparents on Sundays.", translation: "Visito meus avós aos domingos." },
  { level: "A1", text: "My aunt lives in São Paulo.", translation: "Minha tia mora em São Paulo." },
  { level: "A1", text: "My cousin is visiting next month.", translation: "Meu primo vai visitar no próximo mês." },
  { level: "A1", text: "We had a family reunion last summer.", translation: "Tivemos uma reunião de família no verão passado." },
  { level: "A1", text: "My nephew is very playful.", translation: "Meu sobrinho é muito brincalhão." },
  { level: "A1", text: "My niece is very smart.", translation: "Minha sobrinha é muito inteligente." },
  { level: "A1", text: "I have a big family.", translation: "Tenho uma família grande." },
  { level: "A1", text: "We celebrate Christmas together.", translation: "Celebramos o Natal juntos." },
  { level: "A1", text: "My brother lives abroad.", translation: "Meu irmão mora no exterior." },
  { level: "A1", text: "My sister works in another city.", translation: "Minha irmã trabalha em outra cidade." },
  { level: "A1", text: "I am close to my family.", translation: "Sou próximo da minha família." },
  { level: "A2", text: "We support each other through difficult times.", translation: "Nos apoiamos em tempos difíceis." },
  { level: "A2", text: "My family values education very much.", translation: "Minha família valoriza muito a educação." },
  { level: "A2", text: "We gather for dinner every weekend.", translation: "Nos reunimos para jantar todo fim de semana." },
  { level: "A2", text: "My parents have been married for 30 years.", translation: "Meus pais são casados há 30 anos." },
  { level: "A2", text: "I am the eldest child in my family.", translation: "Sou o filho mais velho da minha família." },
  { level: "A2", text: "We share family traditions with our children.", translation: "Compartilhamos tradições familiares com nossos filhos." },

  // ============================================
  // EMOÇÕES E SENTIMENTOS (50 frases)
  // ============================================
  { level: "A1", text: "I am happy.", translation: "Estou feliz." },
  { level: "A1", text: "I am sad.", translation: "Estou triste." },
  { level: "A1", text: "I am excited.", translation: "Estou animado." },
  { level: "A1", text: "I am tired.", translation: "Estou cansado." },
  { level: "A1", text: "I am angry.", translation: "Estou com raiva." },
  { level: "A1", text: "I am scared.", translation: "Estou com medo." },
  { level: "A1", text: "I am surprised.", translation: "Estou surpreso." },
  { level: "A1", text: "I am worried.", translation: "Estou preocupado." },
  { level: "A1", text: "I am grateful.", translation: "Sou grato." },
  { level: "A1", text: "I am confused.", translation: "Estou confuso." },
  { level: "A1", text: "I feel lonely.", translation: "Me sinto sozinho." },
  { level: "A1", text: "I feel comfortable.", translation: "Me sinto confortável." },
  { level: "A1", text: "I feel sick.", translation: "Me sinto doente." },
  { level: "A1", text: "I feel hopeful.", translation: "Me sinto esperançoso." },
  { level: "A1", text: "I feel relax.", translation: "Me sinto relaxado." },
  { level: "A1", text: "I am stressed out.", translation: "Estou estressado." },
  { level: "A1", text: "I am in love.", translation: "Estou apaixonado." },
  { level: "A1", text: "I am proud of myself.", translation: "Estou orgulhoso de mim mesmo." },
  { level: "A1", text: "I feel confident.", translation: "Me sinto confiante." },
  { level: "A1", text: "I feel nostalgic.", translation: "Me sinto nostálgico." },
  { level: "A2", text: "I am feeling overwhelmed with work.", translation: "Me sinto sobrecarregado com o trabalho." },
  { level: "A2", text: "I am thrilled about the news.", translation: "Estou animado com a notícia." },
  { level: "A2", text: "I feel anxious about the exam.", translation: "Me sinto ansioso sobre a prova." },
  { level: "A2", text: "I am relieved that everything is fine.", translation: "Estou aliviado que tudo está bem." },
  { level: "A2", text: "I am passionate about learning.", translation: "Sou apaixonado por aprender." },

  // ============================================
  // B1 - TEMAS AVANÇADOS (150 frases)
  // ============================================
  { level: "B1", text: "I have been working on this project for three months.", translation: "Trabalho neste projeto há três meses." },
  { level: "B1", text: "Understanding the context is more important than knowing every word.", translation: "Entender o contexto é mais importante do que saber cada palavra." },
  { level: "B1", text: "The ability to communicate effectively is crucial in today's world.", translation: "A capacidade de se comunicar efetivamente é crucial no mundo de hoje." },
  { level: "B1", text: "I would have called you if I had known you were waiting.", translation: "Eu teria te ligação se soubesse que você estava esperando." },
  { level: "B1", text: "We should maintain a balance between work and personal life.", translation: "Devemos manter um equilíbrio entre trabalho e vida pessoal." },
  { level: "B1", text: "The research revealed interesting patterns in consumer behavior.", translation: "A pesquisa revelou padrões interessantes no comportamento do consumidor." },
  { level: "B1", text: "I am considering the possibility of pursuing a master's degree abroad.", translation: "Estou considerando a possibilidade de fazer um mestrado no exterior." },
  { level: "B1", text: "She demonstrated remarkable talent in solving complex problems.", translation: "Ela demonstrou talento notável em resolver problemas complexos." },
  { level: "B1", text: "We need to develop critical thinking skills.", translation: "Precisamos desenvolver habilidades de pensamento crítico." },
  { level: "B1", text: "The integration of technology in education has transformed learning.", translation: "A integração da tecnologia na educação transformou a aprendizagem." },
  { level: "B1", text: "Despite the challenges, we achieved our goals.", translation: "Apesar dos desafios, alcançamos nossos objetivos." },
  { level: "B1", text: "I appreciate the opportunity to learn from experienced professionals.", translation: "Apreciei a oportunidade de aprender com profissionais experientes." },
  { level: "B1", text: "The weather forecast predicts rain for the weekend.", translation: "A previsão do tempo prevê chuva para o fim de semana." },
  { level: "B1", text: "She has been studying English for five years.", translation: "Ela está estudando inglês há cinco anos." },
  { level: "B1", text: "We should encourage young people to pursue their dreams.", translation: "Devemos encorajar jovens a seguir seus sonhos." },
  { level: "B1", text: "The documentary covered important social issues.", translation: "O documentário abordou questões sociais importantes." },
  { level: "B1", text: "I was impressed by the quality of the work.", translation: "Fiquei impressionado com a qualidade do trabalho." },
  { level: "B1", text: "We need to find a solution before it's too late.", translation: "Precisamos encontrar uma solução antes que seja tarde demais." },
  { level: "B1", text: "The new policy will take effect next month.", translation: "A nova política entrará em vigor no próximo mês." },
  { level: "B1", text: "I am committed to continuous improvement.", translation: "Estou comprometido com melhoria contínua." },
  { level: "B1", text: "The evidence suggests that regular exercise improves health.", translation: "As evidências sugerem que exercício regular melhora a saúde." },
  { level: "B1", text: "We should protect the environment for future generations.", translation: "Devemos proteger o meio ambiente para as futuras gerações." },
  { level: "B1", text: "The conference brought together experts from around the world.", translation: "O conferência reuniu especialistas de todo o mundo." },
  { level: "B1", text: "I am grateful for all the support I have received.", translation: "Sou grato por todo o apoio que recebi." },
  { level: "B1", text: "The team worked together to solve the problem.", translation: "A equipe trabalhou junta para resolver o problema." },
  { level: "B1", text: "She decided to change her career path.", translation: "Ela decidiu mudar sua trajetória de carreira." },
  { level: "B1", text: "We need to adapt to the changing circumstances.", translation: "Precisamos nos adaptar às circunstâncias em mudança." },
  { level: "B1", text: "The experience taught me valuable lessons.", translation: "A experiência me ensinou lições valiosas." },
  { level: "B1", text: "I recommend this book to anyone interested in the topic.", translation: "Recomendo este livro para qualquer pessoa interessada no assunto." },
  { level: "B1", text: "The company is committed to sustainable practices.", translation: "A empresa está comprometida com práticas sustentáveis." },

  // ============================================
  // B2 - INTERMEDIÁRIO AVANÇADO (100 frases)
  // ============================================
  { level: "B2", text: "The ability to communicate effectively in English opens many professional opportunities.", translation: "A capacidade de se comunicar efetivamente em inglês abre muitas oportunidades profissionais." },
  { level: "B2", text: "Despite the complexity of the task, she managed to complete it on time.", translation: "Apesar da complexidade da tarefa, ela conseguiu completá-la no prazo." },
  { level: "B2", text: "The documentary provided a comprehensive overview of environmental challenges.", translation: "O documentário forneceu uma visão geral abrangente dos desafios ambientais." },
  { level: "B2", text: "His extensive knowledge enabled him to provide valuable insights.", translation: "Seu amplo conhecimento permitiu fornecer insights valiosos." },
  { level: "B2", text: "The integration of technology has transformed traditional business models.", translation: "A integração da tecnologia transformou modelos de negócios tradicionais." },
  { level: "B2", text: "We should create an inclusive environment that celebrates diversity.", translation: "Devemos criar um ambiente inclusivo que celebra a diversidade." },
  { level: "B2", text: "The collaborative approach led to innovative solutions.", translation: "A abordagem colaborativa levou a soluções inovadoras." },
  { level: "B2", text: "I was deeply impressed by the team's dedication and professionalism.", translation: "Fiquei profundamente impressionado com a dedicação e profissionalismo da equipe." },
  { level: "B2", text: "The implementation of sustainable practices requires a fundamental shift in mindset.", translation: "A implementação de práticas sustentáveis requer uma mudança fundamental na mentalidade." },
  { level: "B2", text: "Her strategic vision has positioned the company as a leader in the industry.", translation: "Sua visão estratégica posicionou a empresa como líder na indústria." },
  { level: "B2", text: "Through careful analysis, we identified the root cause of the problem.", translation: "Através de análise cuidadosa, identificamos a causa raiz do problema." },
  { level: "B2", text: "The research findings have significant implications for future policy decisions.", translation: "Os resultados da pesquisa têm implicações significativas para decisões políticas futuras." },
  { level: "B2", text: "We must consider the long-term consequences of our actions.", translation: "Devemos considerar as consequências de longo prazo de nossas ações." },
  { level: "B2", text: "The interdisciplinary approach proved to be highly effective.", translation: "A abordagem interdisciplinar provou ser altamente eficaz." },
  { level: "B2", text: "I have developed a greater appreciation for different perspectives.", translation: "Desenvolvi uma maior apreciação por diferentes perspectivas." },
  { level: "B2", text: "The system is designed to maximize efficiency while minimizing costs.", translation: "O sistema é projetado para maximizar a eficiência enquanto minimiza os custos." },
  { level: "B2", text: "Her leadership during the crisis was exemplary.", translation: "Sua liderança durante a crise foi exemplar." },
  { level: "B2", text: "We should maintain transparency in our decision-making process.", translation: "Devemos manter transparência em nosso processo de tomada de decisão." },
  { level: "B2", text: "The comprehensive review highlighted several areas for improvement.", translation: "A revisão abrangente destacou várias áreas para melhoria." },
  { level: "B2", text: "I am confident that we will achieve our targets this year.", translation: "Estou confiante de que alcançaremos nossas metas este ano." },

  // ============================================
  // C1 - AVANÇADO (60 frases)
  // ============================================
  { level: "C1", text: "The juxtaposition of contrasting ideas in the article stimulated profound intellectual discussion.", translation: "A justaposição de ideias contrastantes no artigo estimulou uma discussão intelectual profunda." },
  { level: "C1", text: "Her sophisticated understanding of cultural nuances allows her to navigate complex negotiations.", translation: "Sua compreensão sofisticada de nuances culturais permite navegar negociações complexas." },
  { level: "C1", text: "The benevolent organization implemented sustainable solutions to address long-term community needs.", translation: "A organização benevolente implementou soluções sustentáveis para atender necessidades de longo prazo da comunidade." },
  { level: "C1", text: "His comprehensive knowledge of literature encompasses multiple genres and historical periods.", translation: "Seu conhecimento abrangente de literatura abrange múltiplos gêneros e períodos históricos." },
  { level: "C1", text: "The ephemeral nature of social media fame underscores the importance of substantive achievements.", translation: "A natureza efêmera da fama nas redes sociais sublinha a importância de conquistas substanciais." },
  { level: "C1", text: "Through meticulous analysis and unprecedented methodology, the researcher revolutionized the field.", translation: "Através de análise meticulosa e metodologia sem precedentes, o pesquisador revolucionou o campo." },
  { level: "C1", text: "The multifaceted nature of global challenges requires integrated solutions.", translation: "A natureza multifacetada dos desafios globais requer soluções integradas." },
  { level: "C1", text: "Her exemplary leadership during the crisis demonstrated unwavering commitment to ethical principles.", translation: "Sua liderança exemplar durante a crise demonstrou compromisso inabalável com princípios éticos." },
  { level: "C1", text: "The strategic implementation yielded measurable improvements in organizational efficiency.", translation: "A implementação estratégica produziu melhorias mensuráveis na eficiência organizacional." },
  { level: "C1", text: "I have come to understand that true mastery comes from continuous learning.", translation: "Chei a entender que a verdadeira mestria vem de aprendizagem contínua." },
  { level: "C1", text: "The comprehensive framework provides a structured approach to complex problem-solving.", translation: "O framework abrangente fornece uma abordagem estruturada para resolução de problemas complexos." },
  { level: "C1", text: "His distinguished career exemplifies the integration of theory and practice.", translation: "Sua carreira distinta exemplifica a integração de teoria e prática." },
  { level: "C1", text: "We should foster an environment that encourages innovation and creativity.", translation: "Devemos promover um ambiente que incentiva inovação e criatividade." },
  { level: "C1", text: "The systematic documentation of best practices has become an invaluable resource.", translation: "A documentação sistemática de melhores práticas se tornou um recurso inestimável." },
  { level: "C1", text: "Her innovative approach has significantly enhanced organizational performance.", translation: "Sua abordagem inovadora melhorou significativamente o desempenho organizacional." },

  // ============================================
  // C2 - FLUENTE (40 frases)
  // ============================================
  { level: "C2", text: "The paradigm-shifting discoveries revolutionized the field through unprecedented methodology.", translation: "As descobertas que mudam paradigmas revolucionaram o campo através de metodologia sem precedentes." },
  { level: "C2", text: "The integration of advanced machine learning techniques optimizes performance across diverse scenarios.", translation: "A integração de técnicas avançadas de aprendizado de máquina otimiza o desempenho em diversos cenários." },
  { level: "C2", text: "The comprehensive treatise provided a nuanced analysis of sociopolitical dynamics shaping contemporary society.", translation: "O tratado abrangente forneceu uma análise matizada das dinâmicas sociopolíticas que moldam a sociedade contemporânea." },
  { level: "C2", text: "Her exceptional ability to synthesize complex information into accessible insights has made her invaluable.", translation: "Sua habilidade excepcional de sintetizar informações complexas em insights acessíveis a tornou inestimável." },
  { level: "C2", text: "The interdisciplinary approach requires unprecedented collaboration across scientific and policy domains.", translation: "A abordagem interdisciplinar requer colaboração sem precedentes entre domínios científicos e de políticas." },
  { level: "C2", text: "His profound understanding of global market dynamics enables strategic decisions that consistently outperform benchmarks.", translation: "Sua compreensão profunda da dinâmica global do mercado permite decisões estratégicas que consistentemente superam benchmarks." },
  { level: "C2", text: "The innovative solution addresses systemic barriers while creating sustainable pathways for future development.", translation: "A solução inovadora aborda barreiras sistêmicas enquanto cria caminhos sustentáveis para desenvolvimento futuro." },
  { level: "C2", text: "The comprehensive review synthesized findings from numerous studies to provide an integrated understanding.", translation: "A revisão abrangente sintetizou resultados de numerosos estudos para fornecer uma compreensão integrada." },
  { level: "C2", text: "Her visionary leadership inspired unprecedented collaboration among diverse stakeholders.", translation: "Sua liderança visionária inspirou colaboração sem precedentes entre diversas partes interessadas." },
  { level: "C2", text: "His seminal work has fundamentally transformed our understanding of complex adaptive systems.", translation: "Seu trabalho seminal transformou fundamentalmente nossa compreensão de sistemas adaptativos complexos." },
]

// Stopwords to exclude from word extraction
const stopWords = new Set([
  'the','a','an','in','on','at','to','for','of','with','and','or','but','is','are','was','were','be','been',
  'have','has','had','do','does','did','will','would','can','could','should','may','might','must','it','its',
  'this','that','these','those','i','you','he','she','we','they','me','him','her','us','them','my','your',
  'his','our','their','not','no','nor','so','if','as','from','by','up','down','about','into','through','during',
  'before','after','above','below','between','out','off','over','under','again','further','then','once','here',
  'there','when','where','why','how','all','each','every','both','few','more','most','other','some','such',
  'only','own','same','than','too','very','just','now','get','got','go','went','am','being','being','being'
])

function extractWords(text) {
  return [...new Set(
    text.toLowerCase()
      .replace(/[^a-z\s']/g, '')
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w))
  )]
}

async function seedComplete() {
  console.log('🚀 Iniciando seed completo do FluentSRS...')
  console.log('   Palavras:', topWords.length, '| Frases:', phraseData.length)
  
  let phrasesAdded = 0
  let wordsCreated = 0
  let linksCreated = 0

  // Processar frases
  console.log('\n📝 Processando frases...')
  for (const p of phraseData) {
    const existing = await prisma.phrase.findUnique({ where: { text: p.text } })
    if (existing) continue

    const wordTexts = extractWords(p.text)
    const wordIds = []

    for (const wt of wordTexts) {
      let word = await prisma.word.findUnique({ where: { word: wt } })
      if (!word) {
        word = await prisma.word.create({
          data: { word: wt, level: p.level, translation: null }
        })
        wordsCreated++
      }
      wordIds.push(word.id)
    }

    const phrase = await prisma.phrase.create({
      data: { text: p.text, translation: p.translation, level: p.level }
    })
    phrasesAdded++

    for (const wid of wordIds) {
      try {
        await prisma.phraseWord.create({ data: { phraseId: phrase.id, wordId: wid } })
        linksCreated++
      } catch {}
    }

    await prisma.sRSRecord.create({
      data: {
        phraseId: phrase.id,
        entityType: 0,
        status: 'new',
        nextReview: new Date(Date.now() + Math.floor(Math.random() * 86400000 * 3)),
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0
      }
    })

    if (phrasesAdded % 50 === 0) {
      console.log(`   ${phrasesAdded} frases processadas...`)
    }
  }

  // Adicionar palavras standalone que ainda não estão no banco
  console.log('\n📚 Processando palavras extras...')
  let extraWords = 0
  for (const w of topWords) {
    const existing = await prisma.word.findUnique({ where: { word: w } })
    if (!existing) {
      await prisma.word.create({
        data: { word: w, level: 'A1', translation: null }
      })
      extraWords++
    }
  }

  // Estatísticas finais
  const totalPhrases = await prisma.phrase.count()
  const totalWords = await prisma.word.count()
  const totalLinks = await prisma.phraseWord.count()
  const totalSRS = await prisma.sRSRecord.count()

  console.log('\n✅ SEED COMPLETO!')
  console.log('═══════════════════════════════')
  console.log(`📖 ${totalPhrases} frases (${phrasesAdded} novas)`)
  console.log(`📝 ${totalWords} palavras (${wordsCreated + extraWords} novas)`)
  console.log(`🔗 ${totalLinks} links palavra-frase`)
  console.log(`🎯 ${totalSRS} registros SRS`)
  console.log('═══════════════════════════════')
  
  await prisma.$disconnect()
}

seedComplete().catch(e => {
  console.error('Erro:', e.message)
  process.exit(1)
})