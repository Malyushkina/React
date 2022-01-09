let tsStr: string = 'qwe';
tsStr = 'ert';

function sumTs(arr: number[]) {
  // указываем явно, что нам нужен в качестве аргумента массив из чисел
  return arr.reduce((a, v) => a + v);
}

const strOrNum: string | number = 2; // такая нотация позволяет записать и число и строку в переменную (Union type)

type StrOrNum = string | number; //создаём свой, пользовательский тип (type alias)
const strOrNum1: StrOrNum = '5';

//array

const tsArr: number[] = [1, 2, 3]; //массив из чисел (не имеет фиксированной длины - бесконечно длинный), все его элементы - числа
const tsArrGeneric: Array<number> = []; // форма записи generic эквивалентно предыдущей записи

const unionArr: (string | number)[] = [1, 2, '3']; // массив смешанных данных
const unionArr2: Array<string | number> = [1, 2, '3'];

//Tuple - массив фиксированной длины

const myTuple: [number, string] = [1, '2']; //объявили, что наш массив имеет длину 2 и первый элемент его - число, а второй - строка
const [val1, val2] = myTuple; //val1 ==> 1, val2 ==> '2'. Деструкция позволяет обратиться к каждому элементу tuple или массива и
//именовать его как нам удобно.

//В react tuple используется, например, в state: const [state, setState] = useState()

// Object

const myObj: { a: number; b: string } = { a: 1, b: '2' }; //явно указываем на тип значения в каждой паре ключ/значение объекта
type myObjType = { a: number; b: string }; //можно также сделать пользовательский тип и для объектов

// для создания объектов можно использовать interface:
interface myObjInterface {
  a: number;
  b: string;
  c: number[];
}
// теперь, если мы будем создавать объект с использованием myObjInterface, TS потребует, чтобы в нём были ключи a, b, c
//с соответствующими типами значений:

const myObj2: myObjInterface = {
  a: 1,
  b: '123',
  c: [1, 2, 3],
};

// interface является более продвинутым, чем type alias
// можно пометить нужные значения в интерфейсе как readonly, и TS при попытке изменить такое значение, выдаст ошибку:

interface myObjInterface2 {
  readonly a: number;
  b: string;
  c: number[];
}

const myObj3: myObjInterface2 = {
  a: 1,
  b: '123',
  c: [1, 2, 3],
};

//myObj3.a = 5; ошибка

// если мы предполагаем, что какого то значения может не быть, то достаточно поставить сразу после его объявления знак вопроса:

interface myObjInterface3 {
  readonly a: number;
  b: string;
  c?: number[]; //optional type. Значением будет либо массив из чисел, либо undefined
}
const myObj4: myObjInterface3 = {
  a: 1,
  b: '123',
};
// соответственно если нам надо обратиться к такому значению, то его надо обернуть в if():
if (myObj4.c) {
  console.log(myObj4.c);
}

// Бывает, что мы не можем описать все значения в объекте, например, мы их не знаем, или их много, тогда
// используют индекс-сигнатуру:

const ApiAnswer: indexInterface = { key: '1fff', key1: '1yff' };

interface indexInterface {
  [n: string]: string;
}
// теперь, если мы запросим тип любого значения из объекта, он будет string. Можно использовать также union type (string|number|....)

//function

//calculate получает метод, левую часть выражения и правую часть выражения. calculate(...):number - указываем, какой тип возвращает
function calculate(method: 'add' | 'sub', left: number, right: number): number {
  switch (method) {
    case 'add':
      return left + right;
    case 'sub':
      return left - right;
  }
}

//enum - уникальный тип данных в TS, конструкция, состоящая из набора именованных логически связанных констант,
//именуемая списком перечисления и определяемая такими примитивными типами, как number и string

enum Methods {
  'add',
  'sub',
}
function calculate2(method: Methods, left: number, right: number): number {
  switch (method) {
    case Methods.add:
      return left + right;
    case Methods.sub:
      return left - right;
  }
}
// функциям тоже можно присваивать типы возвращаемых значений через type

type TypeFn = () => number;
const arrowFn: TypeFn = () => 2; // если результатом ф-ии будет, например, строка, то TS выдаст ошибку

// также можно записать и через интерфейс:

interface interfaceFn {
  (param1: number): number;
}
const arrowFn1: interfaceFn = () => 2;

//если ф-ия не должна ничего возвращать, используем void
interface interfaceFn1 {
  (param1: number, param2: string): void;
}

// в функциях предпочтительно использовать type alias.

//any - тип, который вводит TS. Переменная отмеченная, как any не будет проверяться TS, мы как бы выключили для неё типизацию
//unknown - противоположность any, обозначает, что у переменной нет пока типа. Мы дадим ей тип после. Пока мы не определили для неё тип,
//любые операции с ней для нас недоступны

// never - тип возращаемого значения у ф-ии. Используется, когда ф-ия не должна никогда отработать до конца.

function neverFn(): never {
  throw new Error('my exception');
}

//generics - обобщенные типы. Они нужны для описания похожих, но отличающихся какими-то характеристиками типов.
//<T> - это generic. Например, мы не знаем в данный момент, какого типа данные будут приходить, и вводим переменную для типа - generic
// например, пусть раньше тип валюты приходил, как строка, а стал приходить, как число:

type PaymentInfo = {
  id: number;
  amount: number;
  currency: string;
};

// тогда для того, чтобы передать нужный тип:

type PaymentInfo1<T> = {
  id: number;
  amount: number;
  currency: T;
};

const paymentInfoStr: PaymentInfo1<string> = {
  id: 1,
  amount: 10000,
  currency: 'rub',
};

const paymentInfoNum: PaymentInfo1<number> = {
  id: 1,
  amount: 10000,
  currency: 2,
};
//встроенные generics

//Array, Omit - выкидывает из интерфейса ключ:

interface IExample<T> {
  type: string;
  value: T;
  isEmpty: boolean;
}
const omittedObj: Omit<IExample<string>, 'isEmpty' | 'value'> = {
  type: '',
  //value:'ee' - ошибка, т.к Omit выбросил ключи isEmpty и value из интерфейса
};

//Pick - обратная Omit операция, забирает ключи из интерфейса (только те, которые мы перечислим)

const pickedObj: Pick<IExample<number>, 'type' | 'isEmpty'> = {
  type: 'ttt',
  isEmpty: true,
  //value:2 - ошибка, мы не сказали Pick взять этот ключ
};

//Partial - делает все ключи интерфейса необязательными. Следует быть очень осторожными,
//т.к.внутри кода порождается много условий для обработки

const partial: Partial<IExample<object>> = {
  // объект пустой, т.к. мы сделали все ключи интерфейса необязательными, и TS не выдаёт ошибку
};

//Типизация классов

class myClass {
  public publicField: number = 123;
  private privateField: string = '';
  constructor(arg: number) {
    this.publicField = arg;
    this.privateField = arg + '2';
  }
  public publicMethod(): number {
    return this.publicField;
  }

  private privateMethod(): string {
    return this.privateField;
  }

  protected protectedMethod(): string {
    return this.privateMethod() + '30';
  }
}
//Абстрактный класс. От абстрактного класса можно только унаследоваться
abstract class abstractClass {
  public abstract abstractField: number;
  public abstract abstractMettod(): number;
}

//as - позволяет делать приведение к типу

const mistacke = []; //сюда можно запушить данные любого типа
const mistacke1 = [] as Array<number>; //сюда можно запушить только числа

//typeof - привести интерфейс или type alias к type alias константного значения

const bigObj = {
  a: {
    d: 123,
    e: 356,
  },
  b: '123',
  c: true,
};

type TMyBigObj = typeof bigObj; // теперь мы имеем type alias такой же, как у объекта bigObj

//чтобы сделать все значения type alias как readonly:

const typedMyBigObj: Readonly<TMyBigObj> = bigObj; // теперь все значения typedMyBigObj - это readonly значения bigObj,
// но только для первого уровня вложенности

// keyof - используется для перебора ключей, аналог for(let N of objKeys){}
// перебери все ключи из типа TMyBigObj и дай им тип (такой же как в TMyBigObj с этим ключом)
type myReadonly = {
  readonly [N in keyof TMyBigObj]: TMyBigObj[N]; //mapped types - типы, которые перебирают другие типы
};
const some: myReadonly = {
  a: {
    d: 8888,
    e: 555,
  },
  b: 'adf',
  c: false,
};

//или можно сделать тип myReadonly более универсальным с помощью джененрика:

type myReadonlyGen<T> = { readonly [N in keyof T]: T[N] };

// и вызвать этот тип:
const some1: myReadonlyGen<TMyBigObj> = {
  a: {
    d: 8888,
    e: 555,
  },
  b: 'adf',
  c: false,
};

//попробуем переписать Partial

type myPartial<T> = {
  [N in keyof T]?: T[N]; //теперь все ключи интерфейса необязательны, имеют вид, например, a?:number
};

// перепишем Pick:

type myPick<T, K extends keyof T> = {
  // K - ключи, которые мы хотим вставить из типа Т
  [N in K]: T[N];
};

// теперь напишем тип, который будет делать readonly на всю глубину вложенности объекта

type myReadonlyDeep<T> = {
  readonly [N in keyof T]: T[N] extends object ? myReadonlyDeep<T[N]> : T[N];
};

//type inference - вычисление аргумента джененрика

type removeReadonly<T> = T extends myReadonlyDeep<infer E> ? E : T;//если тип Т является расширением myReadonlyDeep, верни нам его аргумент, если нет - верни Т
