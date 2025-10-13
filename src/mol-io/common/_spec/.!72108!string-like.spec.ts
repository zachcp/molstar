import type { ChunkedBigString } from '../string-like';
import type { Buffer } from "node:buffer";


const SAMPLE_ASCII = `Basketball is a team sport in which two teams, most commonly 
of five players each, opposing one another on a rectangular court, compete with 
the primary objective of shooting a basketball (approximately 9.4 inches (24 cm) 
in diameter) through the defender's hoop (a basket 18 inches (46 cm) in diameter 
mounted 10 feet (3.048 m) high to a backboard at each end of the court), while 
preventing the opposing team from shooting through their own hoop. A field 
goal is worth two points, unless made from behind the three-point line, when 
it is worth three. After a foul, timed play stops and the player fouled or 
designated to shoot a technical foul is given one, two or three one-point free 
throws. The team with the most points at the end of the game wins, but if 
regulation play expires with the score tied, an additional period of play 
(overtime) is mandated.
`;

const SAMPLE_UNICODE_CS = `Zámecký pivovar Frýdlant je průmyslový podnik ve Frýdlantě, 
městě na severu České republiky ve Frýdlantském výběžku Libereckého kraje. Pivovar 
se nachází pod místním hradem a zámkem na břehu řeky Smědé. Stojí na počátku staré 
cesty do Raspenavy (dnes silnice II/290). První zmínky o pivovaru jsou z konce 14. 
století, kdy se v něm vařilo pivo pro potřeby zdejšího hradu. O dvě století 
později se ovšem kvůli lepší dostupnosti přírodních zdrojů přestěhoval do 
podhradí na břeh řeky Smědé. V dalších letech se pivovar postupně rozšiřoval 
a zvyšovala se také jeho roční produkce, která na počátku 20. století 
přesahovala 30 tisíc hektolitrů piva. Ovšem s ohledem na objem finančních 
prostředků, jež by si vyžádala jeho modernizace, došlo v roce 1949 k ukončení 
provozu pivovaru a jeho prostory se využívaly pro zrání sýrů a uskladnění 
zeleniny. Na počátku 21. století se však objevily snahy o opětovné zahájení 
provozu. Vaří se zde pivo značky Albrecht. Slavnostní otevření pivovaru spolu 
s jeho požehnáním proběhlo v červenci 2014.
`;

