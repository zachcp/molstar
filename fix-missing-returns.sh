#!/bin/bash

# Fix Mat3.setValue
sed -i '' '172a\
        return a;
' src/mol-math/linear-algebra/3d/mat3.ts

# Fix Mat4.setValue  
sed -i '' '125a\
        return a;
' src/mol-math/linear-algebra/3d/mat4.ts

# Fix Quat.setIdentity
sed -i '' '54a\
        return out;
' src/mol-math/linear-algebra/3d/quat.ts

# Fix Quat.toObj - add w to return type
sed -i '' 's/toObj(a: Quat) {/toObj(a: Quat): { x: number, y: number, z: number, w: number } {/' src/mol-math/linear-algebra/3d/quat.ts

echo "Fixed missing return statements"
