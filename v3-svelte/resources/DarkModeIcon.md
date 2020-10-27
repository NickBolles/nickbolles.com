This is a cool icon, but what If I could animate the stars differently?

```html
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="
        M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09
        M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11
        
        M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95
        M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
      </svg>
```

Because `M` denotes a move, I can probably break up the path by parts


```html
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="
        <!-- One part, first star? -->
        M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09
        
        <!-- One part, second star? -->
        M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11
        
        <!-- One part, Probably the moon? -->
        M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95
        
        <!-- One part, What's this one? -->
        M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
      </svg>
```

This app is awesome and breaks down the path
https://svg-path-visualizer.netlify.app/#M17.75%2C4.09L15.22%2C6.03L16.13%2C9.09L13.5%2C7.28L10.87%2C9.09L11.78%2C6.03L9.25%2C4.09L12.44%2C4L13.5%2C1L14.56%2C4L17.75%2C4.09M21.25%2C11L19.61%2C12.25L20.2%2C14.23L18.5%2C13.06L16.8%2C14.23L17.39%2C12.25L15.75%2C11L17.81%2C10.95L18.5%2C9L19.19%2C10.95L21.25%2C11M18.97%2C15.95C19.8%2C15.87%2020.69%2C17.05%2020.16%2C17.8C19.84%2C18.25%2019.5%2C18.67%2019.08%2C19.07C15.17%2C23%208.84%2C23%204.94%2C19.07C1.03%2C15.17%201.03%2C8.83%204.94%2C4.93C5.34%2C4.53%205.76%2C4.17%206.21%2C3.85C6.96%2C3.32%208.14%2C4.21%208.06%2C5.04C7.79%2C7.9%208.75%2C10.87%2010.95%2C13.06C13.14%2C15.26%2016.1%2C16.22%2018.97%2C15.95M17.33%2C17.97C14.5%2C17.81%2011.7%2C16.64%209.53%2C14.5C7.36%2C12.31%206.2%2C9.5%206.04%2C6.68C3.23%2C9.82%203.34%2C14.64%206.35%2C17.66C9.37%2C20.67%2014.19%2C20.78%2017.33%2C17.97Z

Looks like the last part is the inside of the moon. Cool!

So then we can just break this up into 3 different SVGs and layer them on top of each other. Or better yet, just 3 different paths and animate the paths themselves.


```html
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <!-- One part, first star -->
        <path fill="currentColor" d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09" />

        <!-- One part, second star -->
        <path fill="currentColor" d="M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11" />

        <!-- One part, both parts of the moon -->
       <path fill="currentColor" d="M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />

    </svg>
```


Holy crap that worked! I almost thought I forgot to remove the original! Sick! now let's animate!