# mzyil: 
I am playing Elite:Dangerous.

I have a ship that can carry maximum 1200 tons of cargo. My ship's laden range is 32 ly. The laden range means I can do a 32 ly jump in 1 go. My ship's unladen range is 49 ly. Unladen range means I can do a 49 ly jump after emptying my cargo in the reference system. My fuel store allows me to do 2 jumps without refueling. I can refuel at both destinations. After jumping to a new star system, I need to do in-system cruising to get to the station from the main star. Because when you jump into a new system you spawn next to the star. So you have to cruise to the station which is usually denoted in light seconds (unit: ls). Bear in mind that visiting planetary outposts takes longer time. Docking to a non-planetary station takes a few minutes while landing on a planetary station takes no less than 5 minutes. If a station is at a similar distance but is not a planetary outpost, I'd prefer that outpost because it is faster to dock and undock there.

I need to source commodities and deliver them to the “Col 285 Sector IF-T b18-9” system. I will start at the "Col 285 Sector IF-T b18-9” system.

There is a list of commodities and the amounts in tons that I need to gather and how much I already have in my cargo.
Plot me route so that I complete my list in the shortest amount of time possible. 

```
Commodity	Buy	Demand	Carrier	Cargo
Aluminium	  40369	  40369	       0	       0
CMM Composite	  43382	  43382	       0	       0
Ceramic Composites	   4975	   4975	       0	       0
Copper	   2602	   2602	       0	       0
Fruit and Vegetables	     280	     280	       0	       0
Insulating Membrane	   1283	   1283	       0	       0
Liquid oxygen	  15626	  15626	       0	       0
Medical Diagnostic Equipment	      50	      50	       0	       0
Polymers	   1703	   1703	       0	       0
Steel	  55471	  55471	       0	       0
Titanium	  33476	  33476	       0	       0
Water	     373	     373	       0	       0
Water Purifiers	     220	     220	       0	       0
```

# GitHub Copilot:
I'll help you plan an efficient route to source all these commodities for delivery to the "Col 285 Sector IF-T b18-9" system. Let me find the nearest stations selling each commodity from your starting location. Let me continue searching for the remaining commodities: Now let me search for the remaining commodities: Based on the search results, I can now create an optimized route plan for you. Let me analyze the data and create an efficient cargo sourcing strategy.

## **Optimized Cargo Sourcing Route Plan**

Given your ship specifications:
- **Cargo capacity**: 1,200 tons
- **Laden range**: 32 ly
- **Unladen range**: 49 ly
- **Fuel capacity**: 2 jumps without refueling

### **Key Findings & Strategy**

**Total cargo needed**: 199,851 tons across 13 commodities
**Required trips**: ~167 trips (199,851 ÷ 1,200)

### **Recommended Multi-Stop Route (Priority Order)**

#### **Trip 1-50: Prioritize closest non-planetary stations**

**1. New Raxxla (30.78 ly) - Coriolis Starport, 1,994 ls**
- ✅ Non-planetary (fast docking)
- ✅ Within laden range
- **Available commodities**:
  - Aluminium (40,369 tons needed)
  - CMM Composite (43,382 tons needed)  
  - Copper (2,602 tons needed)
  - Insulating Membrane (1,283 tons needed)
  - Liquid oxygen (15,626 tons needed)
  - Polymers (1,703 tons needed)
  - Steel (55,471 tons needed)
  - Titanium (33,476 tons needed)

**2. Barad-dur Town (32.31 ly) - Coriolis Starport, 2,434 ls**
- ✅ Non-planetary (fast docking)
- ✅ Within laden range
- **Available commodities**:
  - Steel (55,471 tons needed)
  - Titanium (33,476 tons needed)

#### **Trip 51-100: Secondary stations**

**3. Ploog Gateway (41.34 ly) - Coriolis Starport, 2,130 ls**
- ✅ Non-planetary
- ⚠️ Requires unladen jump (empty cargo first)
- **Available commodities**:
  - Aluminium, Copper, Liquid oxygen, Polymers, Steel, Titanium

**4. Russo Mines (41.14 ly) - Asteroid Base, 648 ls**
- ✅ Non-planetary, shorter cruise distance
- ⚠️ Requires unladen jump
- **Available commodities**:
  - Multiple commodities available

#### **Special commodity stops**

**For Fruit and Vegetables** (280 tons):
- **Wilkinson's Habitat** - In your home system! (0 ly, 153 ls)

**For Medical Diagnostic Equipment** (50 tons):
- **Maine Horizons** (36.94 ly) - Coriolis Starport, 2,665 ls

**For Water** (373 tons):
- **Birdseye Depot** (16.20 ly) - Coriolis Starport, 825 ls

**For Water Purifiers** (220 tons):
- **Kawamori's Progress** (25.13 ly) - Ocellus Starport, 229 ls

### **Execution Strategy**

#### **Phase 1: Bulk Collection (Trips 1-150)**
1. **Empty your ship** at Col 285 Sector IF-T b18-9
2. **Jump unladen to New Raxxla** (30.78 ly) - prioritize highest volume commodities
3. **Fill cargo with**: Steel → Aluminium → CMM Composite → Titanium (in order of volume)
4. **Return laden** to Col 285 Sector IF-T b18-9 (30.78 ly)
5. **Refuel and repeat**

#### **Phase 2: Secondary Stations (Trips 151-165)**
- Use **Barad-dur Town** for remaining Steel/Titanium
- Use **Ploog Gateway** for remaining Aluminium/Copper

#### **Phase 3: Specialized Items (Trips 166-167)**
- Collect small quantities from nearby specialized stations
- **Fruit and Vegetables**: From home system (Wilkinson's Habitat)
- **Water**: From Birdseye Depot (closest)
- **Water Purifiers**: From Kawamori's Progress
- **Medical Equipment**: From Maine Horizons

### **Time Optimization Tips**

1. **Prioritize non-planetary stations** - saves 5+ minutes per docking
2. **Batch similar distances** - minimize total travel time
3. **Start with highest volume items** (Steel: 55,471t, CMM Composite: 43,382t)
4. **Save specialty items for last** - they're small quantities anyway
5. **Always check fuel** - you can do 2 jumps max before refueling

### **Estimated Time**
- **~167 trips total**
- **Average 60-90 minutes per trip** (jump + cruise + dock + load + return)
- **Total: 167-250 hours** depending on efficiency

Would you like me to create a more detailed breakdown for specific commodity prioritization or trip-by-trip planning?