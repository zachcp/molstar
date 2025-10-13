const content = await Deno.readTextFile('slow-types-full.txt');
const lines = content.split('\n');

let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('error[missing-explicit-return-type]:')) {
    count++;
    if (count <= 5) {
      console.log(`Found error at line ${i}:`);
      console.log(`  Line ${i}: ${line}`);
      console.log(`  Line ${i+1}: ${lines[i+1]}`);
      console.log(`  Line ${i+2}: ${lines[i+2]}`);
      console.log(`  Line ${i+3}: ${lines[i+3]}`);
      console.log();
    }
  }
}
console.log(`Total errors found: ${count}`);
