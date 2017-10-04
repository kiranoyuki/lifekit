//
//  Cap for pulsesensor
//
//  design by Egil Kvaleberg, May 2015
//
//  note: flat section of wire channel
//
//  note:
//  design origin is center of pcb, underside of top cover surface

part = "all"; // [ demo, all, section, core  ]
//part = "core";
//part = "section";

pcb_d = 15.8; // main diameter
pcb_w = 5.5; // width of square section
pcb_l = 16.1; // length
pcb_h = 1.5; // thickness
pcb_rim = 0.8;

wire_len = 5.0; // length of wire conduit
wire_dst = 1.27; // distance between wires
wire_dia = 1.5; // diameter of wire (1.27 nominally)

pcb2top = 1.5; // room for wires and components in top (1.1 net)
pcb2bot = 1.1; // lower rim

snap_dia = pcb2bot; // snap lock ridge diameter
snap_len_x = 10; // snap lock length
snap_len_y = pcb_w; // snap lock length

wall = 0.7;
twall = 0.8; // wall size of top 

tol = 0.3;
d = 0.01;


module nut(af, h) { // af is 2*r
	cylinder(r=af/2/cos(30), h=h, $fn=6);
}

module c_cube(x, y, z) {
	translate([-x/2, -y/2, 0]) cube([x, y, z]);
}

module cr_cube(x, y, z, r) {
	hull() {
		for (dx=[-1,1]) for (dy=[-1,1]) translate([dx*(x/2-r), dy*(y/2-r), 0]) cylinder(r=r, h=z, $fn=20);
	}
}

module cr2_cube(x, y, z, r1, r2) {
	hull() {
		for (dx=[-1,1]) for (dy=[-1,1]) translate([dx*(x/2-r1), dy*(y/2-r1), 0]) cylinder(r1=r1, r2=r2, h=z, $fn=20);
	}
}

module snap2() {
	translate([pcb_l/2+tol, -(snap_len_y+2*tol+2*d)/2, -(pcb2top+pcb_h+snap_dia/2)]) rotate([-90, 0, 0]) 
        cylinder(r=snap_dia/2, h=snap_len_y+2*tol+2*d, $fs=0.3);
;
}               

module cap_subtract() {

    // room for components
    translate([0, 0, -pcb2top-d]) cylinder(r=pcb_d/2-pcb_rim, h=pcb2top+d, $fn=60); 
    // room for pcb
    translate([0, 0, -pcb2top-pcb_h-pcb2bot-d]) {
        cylinder(r=pcb_d/2+tol, h=d+pcb2bot+pcb_h+tol, $fn=60); 
        c_cube(pcb_l+2*tol, pcb_w+2*tol, d+pcb2bot+pcb_h+tol);
    }
    // room for wires
    for (dw = [-wire_dst, 0, wire_dst]) 
        translate([dw, -(pcb_d/2-pcb_rim-tol), twall-(wire_dia/2+tol/2+wall)]) rotate([90, 0, 0]) cylinder(r=wire_dia/2+tol/2, h=pcb_rim+2*tol+wire_len+d, $fn=20);
    for (dw = [-wire_dst, wire_dst]) 
        translate([dw, -(pcb_d/2-pcb_rim-tol) - wire_len*0.7, twall-(wire_dia/2+tol/2+wall)]) rotate([90, 0, 180-sign(dw)*15]) cylinder(r=wire_dia/2+tol/2, h=pcb_rim+tol+wire_len*0.7, $fn=20);
        
    translate([0, -pcb_d/2, twall-(wire_dia/2+tol/2+wall)-(wire_dia/2+tol/2)/2]) rotate([90, 0, 0]) c_cube(2*wire_dia, (wire_dia+tol)/2, tol+wire_len+d);
    // cut through side for inserting wire
    translate([0, -pcb_d/2, -pcb2top-pcb_h-pcb2bot]) rotate([90, 0, 0]) c_cube(wire_dia, 2*(pcb_h+pcb2bot+wire_dia/2), tol+wire_len+d);

}

module cap() {
	difference() {
		union() {
			translate([0, 0, -pcb2top-pcb_h-pcb2bot]) {
                cylinder(r=pcb_d/2+tol+wall, h=pcb2top+pcb_h+pcb2bot, $fn=60);
                cr_cube(pcb_l+2*tol+2*wall, pcb_w+2*tol+2*wall, pcb2top+pcb_h+pcb2bot, wall);
            }
            translate([0, 0, 0]) {
                cylinder(r1=pcb_d/2+tol+wall, r2=pcb_d/2+tol, h=twall, $fn=60);
                hull () {
                    cr_cube(pcb_l+2*tol+2*wall, pcb_w+2*tol+2*wall, d, wall);
                    translate([0, 0, twall-d]) cr_cube(pcb_l+2*tol, pcb_w+2*tol, d, wall);    
                }    
            }
            for (dw = [-wire_dst, 0, wire_dst]) 
                translate([dw, -pcb_d/2, twall-(wire_dia/2+tol/2+wall)]) rotate([90, 0, 0]) cylinder(r=wire_dia/2+tol/2+wall, h=tol+wire_len, $fn=20);
            for (dw = [-wire_dst, wire_dst]) 
                translate([dw, -pcb_d/2 - wire_len*0.7, twall-(wire_dia/2+tol/2+wall)]) rotate([90, 0, 180-sign(dw)*15]) cylinder(r=wire_dia/2+tol/2+wall, h=tol+wire_len, $fn=20);
		}
		cap_subtract();  // subtract:
	}

    snap2();
    rotate([0,0,180]) snap2();
}


if (part=="demo" || part=="section") color("green") {
	translate([0, 0, -pcb2top-pcb_h]) {
        cylinder(r=pcb_d/2, h=pcb_h);
        c_cube(pcb_l+2*tol, pcb_w+2*tol, d+pcb2bot+pcb_h+tol);
    } 
}

if (part=="demo") cap(); 

if (part=="all") rotate([180, 0, 0]) cap();
    
if (part=="core") cap_subtract();
    
if (part=="section") intersection () {
    translate([-50, 0, -50]) cube([100, 100, 100]);    
    cap();
}
