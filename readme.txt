Этот проект содержит мои веб-компоненты, классы и утилиты:

1)accord

2)tet.slick.grid

И демки, демонстрирующие их использование.


А так же демки для тестирования прочих js-библиотек:
bootstrap3
jquery

Точка входа: 
http://localhost:8081/accord/  


Иконки взяты из
https://www.flaticon.com/icon-fonts-most-downloaded?weight=regular&type=uicon

--------------

MainServletContextListener
  при запуске создаёт списки jsp-файлов с демками.
  Закидывает их в качестве атрибутов ServletContext (ServletContext.setAttribute)
Благодаря этому их видят core-таги вроде "<c:forEach"









