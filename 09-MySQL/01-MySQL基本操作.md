# 二、MySQL基本操作

## 1. 使用MySQL

### 连接数据库

```sh
$ mysql -u root -p
```

`-u` 用户名，`-p` 输入密码， `-h` 主机名， `-P` 端口，`mysql --help` 查看帮助

连接到数据库需要：主机名（本地为localhost）、端口（如果使用默认端口3306之外的端口）、合法的用户名、用户口令（如果需要）

### 创建数据库

从 [09-MySQL/src](https://github.com/fuyi501/web-fullStack/tree/master/09-MySQL/src) 下载 `create.sql` 和 `populate.sql` 两个 `sql` 脚本文件，其中，`create.sql` 包含创建6个数据库表的MySQL语句，`populate.sql` 包含用来填充这些表的INSERT语句。执行下列操作：

```sql
--创建数据库
CREATE DATABASE crashcourse
--使用数据库
--必须先使用USE打开数据库，才能读取其中的数据。
USE crashcourse
--执行sql脚本
--需要指定文件的完整路径
--先执行 create.sql，再执行 populate.sql
SOURCE ~/create.sql
SOURCE ~/populate.sql
```
以上为准备工作。􏱺􏱻􏱼􏱽􏱾􏰠􏰎􏱿􏲀

### 了解数据库和表

```sql
-- 显示可用的数据库列表
SHOW DATABASES;

-- 获得一个数据库内的表的列表
SHOW TABLES;

-- 用来显示表列
SHOW COLUMNS FROM customers;
DESCRIBE customers; -- DESCRIBE customers;是 SHOW COLUMNS FROM customers;的一种快捷方式

-- 其他SHOW语句
SHOW STATUS -- 用于显示广泛的服务器状态信息
SHOW CREATE DATABASE -- 显示创建特定数据库的MySQL语句
SHOW CREATE TABLE -- 显示创建特定表的语句
SHOW GRANTS -- 显示授予用户（所有用户或特定用户）的安全权限
SHOW ERRORS -- 显示服务器错误
SHOW WARNINGS -- 显示警告信息
```

## 2. 检索数据

### SELECT语句

```sql
-- 检索单个列
-- 检索products表中的prod_name列
SELECT prod_name FROM products;

-- 检索多个列
-- 检索products表中的prod_id，prod_name和prod_price列
SELECT prod_id, prod_name, prod_price FROM products;

-- 检索所有列
-- 检索products表中的所有列
-- 一般，除非你确实需要表中的每个列，否则最好别使用*通配符。
-- 虽然使用通配符可能会使你自己省事，不用明确列出所需列，但检索不需要的列通常会降低检索和应用程序的性能。
SELECT * FROM products;

-- 检索不同的行
-- DISTINCT关键字必须直接放在列名的前面，
-- 不能部分使用DISTINCT，DISTINCT关键字应用于所有列而不仅是前置它的列。
-- 如果给出SELECT DISTINCT vend_id,prod_price，除非指定的两个列都不同，否则所有行都将被检索出来。
SELECT DISTINCT vend_id FROM products;

-- 限制结果，指定返回前几行
-- 返回不多于5行
SELECT prod_name FROM products LIMIT 5;
-- 返回从第5行开始的5行
SELECT prod_name FROM products LIMIT 5,5;
```

::: warning 检索出来的第一行为行0
**检索出来的第一行为行0而不是行1**，因此`LIMIT 1,1`检索出来的是第二行而不是第一行。
:::

::: warning MySQL 5的LIMIT语法
`LIMIT 3, 4` 的含义是从行4开始的3行还是从行3开始的4行? <br>
如前所述，它的意思是从行3开始的4行，这容易把人搞糊涂。
由于这个原因，MySQL 5支持LIMIT的另一种替代语法。`LIMIT 4 OFFSET 3` 意为从行3开始取4行，就像 `LIMIT 3, 4` 一样。
:::

```sql
-- 使用完全限定的表名
SELECT products.prod_name FROM products;
SELECT products.prod_name FROM crashcoures.products;
```

## 3. 排序检索数据

::: tip 子句（clause）
SQL语句由子句构成，有些子句是必需的，而有的是可选的。一个子句通常由一个关键字和所提供的数据组成。子句的例子有SELECT语句的FROM子句等。
:::

### 使用 ORDER BY

```sql
-- 排序数据
SELECT prod_name
FROM products
ORDER BY prod_name;

-- 可以通过非选择列进行排序
SELECT prod_name
FROM products
ORDER BY vend_id;

-- 按多个列排序
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price, prod_name;
```

上面的代码检索3个列，并按其中两个列对结果进行排序——首先按价格，然后再按名称排序。重要的是理解在按多个列排序时，排序完全按所规定的顺序进行。对于上述例子中的输出，仅在多个行具有相同的prod_price 值时才对产品按prod_name进行排序。如果prod_price列中所有的值都是唯一的，则不会按prod_name排序。

```sql
-- 指定排序方向
-- 默认升序排序，降序使用 DESC 关键字
SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price DESC;

SELECT prod_id, prod_price, prod_name
FROM products
ORDER BY prod_price DESC, prod_name;
```

DESC关键字只应用到直接位于其前面的列名。上例中，只对prod_price列指定DESC，对prod_name列不指定。因此，prod_price列以降序排序， 而prod_name列（在每个价格内）仍然按标准的升序排序。

::: warning 在多个列上降序排序
**如果想在多个列上进行降序排序，必须对每个列指定DESC关键字。**
:::

与DESC相反的关键字是ASC（ASCENDING），在升序排序时可以指定它。但实际上，ASC没有多大用处，因为升序是默认的。

**例子：找出一列中最高或最低的值**

```sql
SELECT prod_proce FROM products
ORDER BY prod_price DESC LIMIT 1;
```

::: warning ORDER BY子句的位置
在给出ORDER BY子句时，应该保证它位于FROM子句之后。如果使用LIMIT，它必须位于 ORDER BY 之后。使用子句的次序不对将产生错误消息。
:::

## 4. 过滤数据

### 使用WHERE子句

```sql
-- 返回prod_price为2.50的行
SELECT prod_name, prod_price
FROM products
WHERE prod_price = 2.50
```

:::warning WHERE子句的位置
在同时使用ORDER BY和WHERE子句时，应该让ORDER BY位于WHERE之后，否则将会产生错误。
:::

### WHERE子句操作符

| 符号 | 说明 |
|-----|-----|
| = | 等于 |
| <> | 不等于 |
| != | 不等于 |
| < | 小于 |
| <= | 小于等于 |
| > | 大于 |
| >= | 大于等于 |
| BETWEEN | 在指定的两个值之间 |

```sql
-- 检查单个值
-- 返回prod_name为Fuses的一行（匹配时默认不区分大小写）
SELECT prod_name, prod_price FROM products WHERE prod_name = 'fuses';

-- 列出小于10美元的所有产品
SELECT prod_name, prod_price FROM products WHERE prod_price < 10;

-- 列出小于等于10美元的所有产品
SELECT prod_name, prod_price FROM products WHERE prod_price <= 10;

-- 不匹配检查
-- 列出不是1003的所有产品
SELECT vend_id, prod_name FROM products WHERE vend_id <> 1003;
SELECT vend_id, prod_name FROM products WHERE vend_id != 1003;

-- 范围值检查
-- 检索价格在5-10美元之间的所有产品
-- BETWEEN匹配范围中所有的值，包括指定的开始值和结束值。
SELECT prod_name, prod_price FROM products
WHERE prod_price BETWEEN 5 AND 10;

-- 空值检查
-- 返回价格为空的所有产品
SELECT prod_name FROM products WHERE prod_price IS NULL;
```

## 5. 插入数据

INSERT是用来插入（或添加）行到数据库表的。插入可以用几种方式使用：

- 插入完整的行
- 插入行的一部分
- 插入多行
- 插入某些查询的结果

### 插入完整的行

```sql
INSERT INTO Customers
VALUES(NULL,
  'Pep E. LaPew',
  '100 Main Street',
  'Los Angles',
  'CA',
  '90046',
  'USA',
  NULL,
  NULL);
```

此例子插入一个新客户到customers表。存储到每个表列中的数据在VALUES子句中给出，**对每个列必须提供一个值**。如果某个列没有值（如上面的cust_contact和cust_email列），应该使用NULL值（假定表允许对该列指定空值）。各个列必须以它们在表定义中出现的次序填充。**第一列cust_id也为NULL。这是因为每次插入一个新行时，该列由MySQL自动增量。你不想给出一个值（这是MySQL的工作），又不能省略此列（如前所述，必须给出每个列），所以指定一个NULL值（它被MySQL忽略，MySQL在这里插入下一个可用的cust_id值）。**

虽然这种语法很简单， 但并不安全， 应该尽量避免使用。 上面的SQL 语句高度依赖于表中列的定义次序，并且还依赖于其次序容易获得的信息。即使可得到这种次序信息，也不能保证下一次表结构变动后各个列保持完全相同的次序。 因此， 编写依赖于特定列次序的SQL语句是很不安全的。如果这样做，有时难免会出问题。

编写INSERT语句的更安全（不过更烦琐）的方法如下：

```sql
INSERT INTO customers(cust_name,
  cust_address,
  cust_city,
  cust_state,
  cust_zip,
  cust_country,
  cust_contact,
  cust_email)
VALUES('Pep E. LaPew',
  '100 Main Street',
  'Los Angeles',
  'CA',
  '90046'
  'USA'
  NULL,
  NULL);

# 下面的INSERT语句填充所有列（与前面的一样），但以一种不同的次序填充。
# 因为给出了列名，所以插入结果仍然正确：
INSERT INTO customers(cust_name,
  cust_contact,
  cust_email,
  cust_address,
  cust_city,
  cust_state,
  cust_zip,
  cust_country)
VALUES('Pep E. LaPew',
  NULL,
  NULL,
  '100 Main Street',
  'Los Angles',
  'CA',
  '90046',
  'USA');
```

:::warning 仔细地给出值
不管使用哪种INSERT语法，都必须给出VALUES的正确数目。如果不提供列名，则必须给每个表列提供一个值。如果提供列名，则必须对每个列出的列给出一个值。
如果不这样，将产生一条错误消息，相应的行插入不成功。
:::

:::warning 省略列
如果表的定义允许，则可以在INSERT操作中省略某些列。省略的列必须满足以下某个条件。

- 该列定义为允许NULL值（无值或空值）。
- 在表定义中给出默认值。这表示如果不给出值，将使用默认值。

如果对表中不允许NULL值且没有默认值的列不给出值，则MySQL将产生一条错误消息，并且相应的行插入不成功。
:::

### 插入多个行

INSERT可以插入一行到一个表中。但如果你想插入多个行怎么办？可以使用多条INSERT语句，甚至一次提交它们，每条语句用一个分号结束，如下所示：

```sql
INSERT INTO customers(cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip,
    cust_country)
VALUES('Pep E. LaPew',
    '100 Main Street'
    'Los Angeles',
    'CA',
    '90046',
    'USA');

INSERT INTO customers(cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip,
    cust_country)
VALUES('M. Martian',
    '42 Galaxy Way'
    'New York',
    'NY',
    '11213',
    'USA');
```

或者，只要每条INSERT语句中的列名（和次序）相同，可以如下组合各语句：

```sql
# 使用组合句
# 单条INSERT语句有多组值，每组值用一对圆括号括起来，用逗号分隔。
INSERT INTO customers(cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip,
    cust_country)
VALUES('Pep E. LaPew',
    '100 Main Street'
    'Los Angeles',
    'CA',
    '90046',
    'USA'),

    ('M. Martian',
    '42 Galaxy Way'
    'New York',
    'NY',
    '11213',
    'USA');
```

### 插入检索出的数据

INSERT一般用来给表插入一个指定列值的行。但是，INSERT还存在另一种形式，可以利用它将一条SELECT语句的结果插入表中。这就是所谓的`INSERT SELECT`，顾名思义，它是由一条INSERT语句和一条SELECT 语句组成的。

```sql
INSERT INTO customers(cust_id,
    cust_contact,
    cust_email,
    cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip,
    cust_country)
SELECT cust_id,
    cust_contact,
    cust_email,
    cust_name,
    cust_address,
    cust_city,
    cust_state,
    cust_zip,
    cust_country
FROM custnew;
```

::: tip INSERT SELECT中的列名
为简单起见，这个例子在INSERT和SELECT语句中使用了相同的列名。但是，不一定要求列名匹配。
事实上，MySQL甚至不关心SELECT返回的列名。它使用的是列的位置，因此SELECT中的第一列（不管其列名）将用来填充表列中指定的第一个列，第二列将用来填充表列中指定的第二个列，如此等等。这对于从使用不同列名的表中导入数据是非常有用的。
:::

## 6. 更新数据

为了更新（修改）表中的数据，可使用UPDATE语句。可采用两种方式使用UPDATE：

- 更新表中特定行
- 更新表中所有行

:::warning 不要省略WHERE子句
在使用UPDATE时一定要注意细心。 因为稍不注意，就会更新表中所有行。
:::

UPDATE语句非常容易使用，甚至可以说是太容易使用了。基本的UPDATE语句由3部分组成，分别是：

- 要更新的表；
- 列名和它们的新值；
- 确定要更新行的过滤条件。

例：客户10005更新电子邮件

```sql
UPDATE customers
SET cust_email = 'elmer@fudd.com'
WHERE cust_id = 10005;
```

例：更新多个列

```sql
UPDARTE customers
SET cust_name = 'The Fudds',
    cust_email = 'elmer@fudd.com'
WHERE cust_id = 10005;
```
在更新多个列时，只需要使用单个SET命令，每个 "列=值" 对之间用逗号分隔（最后一列之后不用逗号）。在此例子中，更新客户10005的cust_name和cust_email列。

:::warning IGNORE关键字
如果用UPDATE语句更新多行，并且在更新这些行中的一行或多行时出现一个错误，则整个UPDATE操作被取消（错误发生前更新的所有行被恢复到它们原来的值）。为即使是发生错误，也继续进行更新，可使用IGNORE关键字，如下所示：

`UPDATE IGNORE customers…`
:::

为了删除某个列的值，可设置它为NULL（假如表定义允许NULL值）。

如下进行：

```sql
UPDATE customers
SET cust_email = NULL
WHERE cust_id = 10005;
```

## 7. 删除数据

为了从一个表中删除（去掉）数据，使用DELETE语句。可以两种方式使用DELETE：

- 从表中删除特定的行
- 从表中删除所有的行

:::warning 不要省略WHERE子句
在使用DELETE时一定要注意细心。因为稍不注意，就会错误地删除表中所有行。
:::

```sql
DELETE FROM customers
WHERE cust_id = 10006;
```

**DELETE不需要列名或通配符。DELETE删除整行而不是删除列。为了删除指定的列，请使用UPDATE语句。**

:::tip 删除表的内容而不是表
DELETE语句从表中删除行，甚至是删除表中所有行。但是，DELETE不删除表本身。
:::

::: warning 更快的删除
如果想从表中删除所有行，不要使用DELETE。
可使用TRUNCATE TABLE语句，它完成相同的工作，但速度更快（TRUNCATE实际是删除原来的表并重新创建一个表，而不是逐行删除表中的数据）。
:::

### 更新和删除的指导原则

下面是许多SQL程序员使用UPDATE或DELETE时所遵循的习惯。

- 除非确实打算更新和删除每一行，否则绝对不要使用不带WHERE子句的UPDATE或DELETE语句。
- 保证每个表都有主键，尽可能像WHERE子句那样使用它（可以指定各主键、多个值或值的范围）。
- 在对UPDATE或DELETE语句使用WHERE子句前，应该先用SELECT进行测试，保证它过滤的是正确的记录，以防编写的WHERE子句不正确。
- 使用强制实施引用完整性的数据库，这样MySQL将不允许删除具有与其他表相关联的数据的行。

## 8. MySQL的注释方法

一共有三种，分别为：

```sql
# 单行注释可以使用"#"
-- 单行注释也可以使用"--"，注意与注释之间有空格
/*
用于多行注释
*/
```
