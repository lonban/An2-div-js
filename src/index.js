class Div
{
  type=''
  current={}


  constructor(type,div)
  {
    this.type=type||'';
    this.current=div||'';
  }

  type_(fun)
  {
    if(this.type=='id'){
      fun(this.current);
    }else if(this.type=='class'||this.type=='tag'){
      for(let i=0;i<this.current.length;i++){
        fun(this.current[i]);
      }
    }
  }

  get(name)
  {
    let top = name.substring(0,1);
    let val = name.substring(1);
    let arr = [];
    let elements = {};
    let type='';
    let current='';
    switch(top){
      case '#':
        type = 'id';
        current = document.getElementById(val);
        break;
      case '.':
        type = 'class';
        arr = [];
        elements = document.getElementsByClassName(val);
        if(elements.length>0){
          for(let i=0;i<elements.length;i++){
            arr.push(elements[i]);
          }
          current = arr;
        }
        break;
      default:
        type = 'tag';
        arr = [];
        elements = document.getElementsByTagName(top+val);
        if(elements.length>0){
          for(let i=0;i<elements.length;i++){
            arr.push(elements[i]);
          }
          current = arr;
        }
    }
    return new Div(type,current);
  }

  /*被选元素自身*/
  prop()
  {
    return this.current;
  }

  /*添加class 'a b c',或者是val为空获取被选元素的所有class值*/
  addClass(val)
  {
    let className = '';
    this.type_((element)=>{
      if(val){
        if(element.className){
          element.className += ' '+val;
        }else{
          element.className += val;
        }
      }else{
        className += element.className+',';
      }
    });
    if(!val){
      return className.replace(/^,|,$/g,"");
    }
    return this;
  }

  /*添加属性*/
  attr()
  {}

  /*设置样式*/
  css(style)
  {
    this.type_((element)=>{
      for(let k in style){
        element.style[k] = style[k];
      }
    });
    return this;
  }

  /*创建节点，在被选元素的开头（内部）插入指定内容*/
  prepend(html)
  {
    this.type_((element)=>{
      let div = document.createElement('div');
      let div_class = document.createAttribute('class');
      div_class.value = 'an2_div_create_element';
      div.innerHTML += html;
      div.setAttributeNode(div_class);
      element.insertBefore(div,element.childNodes[0]);
    });
  }

  /*创建节点，在被选元素的结尾（内部）插入指定内容*/
  append(html)
  {
    this.type_((element)=>{
      let div = document.createElement('div');
      let div_class = document.createAttribute('class');
      div_class.value = 'an2_div_create_element';
      div.innerHTML += html;
      div.setAttributeNode(div_class);
      element.appendChild(div);
    });
    return this;
  }

  /*删除节点*/
  remove()
  {
    this.type_((element)=>{
      element.remove();
    });
    return this;
  }

  /*被选元素父元素*/
  parent(name)
  {}

  /*被选元素子元素*/
  children(name)
  {}
}

export default Div;
