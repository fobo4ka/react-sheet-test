# react-sheet-test

Реализовано текстовое поле ввода с маской на ReactJS.
 
Маска задается строковым свойством mask, которое может содержать любой текст и следующие управляющие символы:
“*” – любой символ
“|” – цифра
“§” – буква
 
Текст должен заполнятся автоматически по мере ввода или быть виден сразу. Вместо управляющих символов пользователь должен ввести соответствующие данные.
 
Пример маски для телефонного номера:
| (|||) |||-||-||
 
Поле не должно давать вводить данные, не проходящие по маске. Поле должно поддерживать вставку данных (пример для тестирования: +79998882222 должен вставлятся в поле с маской | (|||) |||-||-|| как 7 (999) 888-22-22 )
 

https://fobo4ka.github.io/react-sheet-test/
