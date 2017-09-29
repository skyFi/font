# font

需求列表：

- [x] 智能多行省略，JavaScript截断文字（尾部空格，自定义省略符号等）beta
- [x] 计算文字的宽度（给一串文字，告诉你它的宽度）

# Install

```
npm install easyfont --save
```

# Usage

```
import Font from 'easyfont';

// 截断字符
const omit = async (str, id) => {
  const result = await new EasyFont().pipe(str).id(id)
          .operation('truncate')
          .option({ width: 270, row: 2, fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
          .value();
  return result;
}

// 获取文字宽度
const measure = async (str, id) => {
  const result = await new EasyFont().pipe(str).id(id)
          .operation('measure')
          .option({ fontSize: 14, fontFamily: "'PingFang SC', sans-serif" })
          .value();
  return result;
}
...
const res1 = await omit('Skylor.min is very handsome!', 1);
const res2 = await measure('Skylor.min is very handsome!', 1);
console.log(res1.result); // 省略后的字符，或许这就是你需要的 ^o^
console.log(res2); // 测量文字的结果，宽度等
...
```

# Option

* fontSize -> set font size.
* fontFamily -> set font family, eg: 'PingFang SC', sans-serif.
* fontWeight -> set font weight, eg: bold.
* src -> set font src, (use for custom font family, deprecated!)
* width -> set font box width.
* row -> omit the number of rows.
* lack -> at the end of the space num.
* ellipsis -> custom apostrophes.

# Method

-- ing

# License

MIT License

Copyright (c) 2017 fang.yongle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
