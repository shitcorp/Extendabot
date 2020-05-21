# Simple Unit Converter PLugins


## Usage:

This plugin doesn't require any configuration at all, simply drag it in and you are ready to go. It simply registeres the following commands:


+ convert 
    + converts from one unit to another
    + example usage: ```convert m mm 3``` 
        + converts 3 meters into millimeters
        + output:
            ``` 
            3000mm 
            ``` 
          
+ convert -p
    + returns all possible conversions for the specified unit
    + example usage: ```convert -p ml```
        + output:
            ```
          • mm3 (Cubic Millimeter) 
          • cm3 (Cubic Centimeter) 
          • ml (Millilitre) 
          • cl (Centilitre) 
          • dl (Decilitre) 
          • l (Litre) 
          • kl (Kilolitre) 
          • m3 (Cubic meter) 
          • km3 (Cubic kilometer) 
          • krm (Matsked) 
          • tsk (Tesked) 
          • msk (Matsked) 
          • kkp (Kaffekopp) 
          • glas (Glas) 
          • kanna (Kanna) 
          • tsp (Teaspoon) 
          • Tbs (Tablespoon) 
          • in3 (Cubic inch) 
          • fl-oz (Fluid Ounce) 
          • cup (Cup) 
          • pnt (Pint) 
          • qt (Quart) 
          • gal (Gallon) 
          • ft3 (Cubic foot) 
          • yd3 (Cubic yard)
          ```

+ info 
    + returns some basic information about the specified unit
    + example usage: ```info V```
        + output: 
            ``` 
            unit: 'V', 
            system: 'metric', 
            singular: 'Volt', 
            plural: 'Volts'  
            ```


## Config:

> This plugin does legit not require any form of configuration whatsoever. simpyly drag it in, restart the bot and you are good to go.

## Units

<details><summary>Length</summary>
<p>

* mm
* cm
* m
* in
* ft-us
* ft
* fathom
* mi
* nMi
 
</p>
</details>

<details><summary>Area</summary>
<p>
  
* mm2
* cm2
* m2
* ha
* km2
* in2
* ft2
* ac
* mi2

</p>
</details>

<details><summary>Mass</summary>
<p>
  
* mcg
* mg
* g
* kg
* oz
* lb
* mt
* t

</p>
</details>

<details><summary>Volume</summary>
<p>
  
* mm3
* cm3
* ml
* l
* kl
* m3
* km3
* tsp
* Tbs
* in3
* fl-oz
* cup
* pnt
* qt
* gal
* ft3
* yd3

</p>
</details>

<details><summary>Volume Flow Rate</summary>
<p>
  
* mm3/s
* cm3/s
* ml/s
* cl/s
* dl/s
* l/s
* l/min
* l/h
* kl/s
* kl/min
* kl/h
* m3/s
* m3/min
* m3/h
* km3/s
* tsp/s
* Tbs/s
* in3/s
* in3/min
* in3/h
* fl-oz/s
* fl-oz/min
* fl-oz/h
* cup/s
* pnt/s
* pnt/min
* pnt/h
* qt/s
* gal/s
* gal/min
* gal/h
* ft3/s
* ft3/min
* ft3/h
* yd3/s
* yd3/min
* yd3/h'

</p>
</details>

<details><summary>Temperature</summary>
<p>
  
* C
* F
* K
* R

</p>
</details>

<details><summary>Time</summary>
<p>
  
* ns
* mu
* ms
* s
* min
* h
* d
* week
* month
* year

</p>
</details>

<details><summary>Frequency</summary>
<p>
  
* Hz
* mHz
* kHz
* MHz
* GHz
* THz
* rpm
* deg/s
* rad/s

</p>
</details>

<details><summary>Speed</summary>
<p>
  
* m/s
* km/h
* m/h
* knot
* ft/s

</p>
</details>

<details><summary>Pace</summary>
<p>
  
* s/m
* min/km
* s/ft
* min/km

</p>
</details>

<details><summary>Pressure</summary>
<p>
  
* Pa
* hPa
* kPa
* MPa
* bar
* torr
* psi
* ksi

</p>
</details>

<details><summary>Digital</summary>
<p>
  
* b
* Kb
* Mb
* Gb
* Tb
* B
* KB
* MB
* GB
* TB

</p>
</details>

<details><summary>Illuminance</summary>
<p>
  
* lx
* ft-cd

</p>
</details>

<details><summary>Parts-Per</summary>
<p>
  
* ppm
* ppb
* ppt
* ppq

</p>
</details>

<details><summary>Voltage</summary>
<p>
  
* V
* mV
* kV

</p>
</details>

<details><summary>Current</summary>
<p>
  
* A
* mA
* kA

</p>
</details>

<details><summary>Power</summary>
<p>
  
* W
* mW
* kW
* MW
* GW

</p>
</details>

<details><summary>Apparent Power</summary>
<p>
  
* VA
* mVA
* kVA
* MVA
* GVA

</p>
</details>

<details><summary>Reactive Power</summary>
<p>
  
* VAR
* mVAR
* kVAR
* MVAR
* GVAR

</p>
</details>

<details><summary>Energy</summary>
<p>
  
* Wh
* mWh
* kWh
* MWh
* GWh
* J
* kJ

</p>
</details>

<details><summary>Reactive Energy</summary>
<p>
  
* VARh
* mVARh
* kVARh
* MVARh
* GVARh

</p>
</details>

<details><summary>Angle</summary>
<p>
  
* deg
* rad
* grad
* arcmin
* arcsec

</p>
</details>

<details><summary>Charge</summary>
<p>
  
* c
* mC
* μC
* nC
* pC

</p>
</details>

<details><summary>Force</summary>
<p>
  
* N
* kN
* lbf

</p>
</details>

<details><summary>Acceleration</summary>
<p>
  
* g (g-force)
* m/s2

</p>
</details>




# Credits:

### Huge shoutout to [units-converter](https://github.com/nosferatoy/units-converter) by [noseferatoy](https://github.com/nosferatoy). Go check it out, its a rewamp of the old npm package called 'unit-converter'.