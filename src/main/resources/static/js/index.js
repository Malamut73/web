var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
  props: ['messages', 'messageAttr'],
  data: function(){
    return{
      text: ''
    }
  },

  template:
    '<div>' +
      '<input type="text" placeholder="Write something" v-model="text"/>' +
      '<input type="button" value="Save" @click="save"/>' +
    '</div>',
  methods:{
      save: function(){
        var message = { text: this.text };
        messageApi.save({}, message).then(result =>
          result.json().then(data => {
            this.messages.push(data);
            this.text = ''
          })
        )
      }
    }
});

Vue.component('message-row', {
  props: ['message', 'editMethod'],
  template: '<div>' +
                 '<i>({{ message.id }})</i> {{ message.text }}' +
                  '<span>' +
                    '<input type="button" value="Edit" @click="edit" />' +
                  '</span>' +
                '</div>',
    methods: {
      edit: function(){
        this.editMethod(this.message);
      }
    }
});

Vue.component('messages-list', {
  props: ['messages'],
  data: function(){
    return {
      message: null
    }
  },
  template: '<div>' +
                '<message-form :messages="messages" :messageAttr="message"/>' +
                '<message-row v-for="message in messages" :key="message.id" :message="message"' +
                 ':editMethod="editMethod"/>' +
              '</div>',
  created: function(){
    messageApi.get().then(result =>
        result.json().then(data =>
            data.forEach(message => this.messages.push(message))
        )
      )
  },
  methods:{
    editMethod: function(){
      this.message = message;
    }
  }
});

var app = new Vue({
  el: '#app',
  template: '<messages-list :messages="messages"/>',
  data: {
    messages: []
  }
});


/*
props: ['message'],
template: '<div>' + 
              '<i>({{ message.id }})</i>' +
              '{{ message.text }}' +
            '</div>'
});```

Это определение компонента `message-row`. Он имеет один входной параметр `message` и отображает содержимое сообщения в виде строки с номером сообщения (его `id`) в круглых скобках и текстом сообщения. 

```Vue.component('messages-list', {
props: ['messages'],
template: '<div>' +
            '<div><message-row v-for="message in messages" :message="message"/></div>' + 
          '</div>'
});```

Это определение компонента `messages-list`. Он имеет один входной параметр `messages`, который является массивом объектов сообщений. 
Он также использует компонент `message-row` для отображения каждого сообщения в списке. Он использует директиву `v-for` для отображения каждого элемента массива `messages`.

```var app = new Vue({
el: '#app',
template: '<messages-list :messages="messages"/>',
data: {
messages: [
    {id: '123', text: 'Wow'},
    {id: '23', text: 'More'},
    {id: '3', text: 'Another'}
]
}
});```

Это создает экземпляр Vue приложения с использованием элемента с идентификатором `#app` в качестве контейнера для приложения. Он также определяет данные приложения в виде массива объектов сообщений. Шаблон приложения использует компонент `messages-list` для отображения списка сообщений. Входной параметр `messages` этого компонента связан с массивом сообщений, определенным в данных приложения. 

В результате при запуске приложения мы получим список сообщений, который будет отображаться на странице с помощью компонентов `message-row` и `messages-list`.

*/
























//let images = document.querySelectorAll("#animation img");
//let activeImageIndex = 0;
//
//setInterval(() => {
//  let nextImageIndex = activeImageIndex + 1;
//  if (nextImageIndex >= images.length) {
//    nextImageIndex = 0;
//  }
//
//  images[nextImageIndex].classList.add("active");
//  images[activeImageIndex].classList.remove("active");
//
//  activeImageIndex = nextImageIndex;
//}, 3000);


