import unwaste_compile from "../dist/unwaste.js";

// Test unwasting here.

console.log(unwaste_compile(`Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 8 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 589 bytes | 589.00 KiB/s, done.
Total 6 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/LiaoxyuCM/unwasting.git
   d125dbb..14087d9  master -> master`));


