// Used OpenGL powerpoint on black board and https://learnopengl.com/code_viewer_gh.php?code=src/2.lighting/2.2.basic_lighting_specular/2.2.basic_lighting.fs


//declare GLSL version 3.3
#version 330 core

//input from vertex shader
in vec3 vs_norm;  
in vec3 vs_pos;  
 
//declare vec3 uniforms 
uniform vec3 lightPosi; 
uniform vec3 viewPosi; 
uniform vec3 lightColor;
uniform vec3 cubeColor;

//output
out vec4 finalShade;

void main()
{
    //calculating ambient shade
    //how strong the fixed brightness of cube is 
    float ambStrength = 0.2;
    //combining brightness of cube with color to find total ambient shade
    vec3 ambient = ambStrength * lightColor;
  	
    //calculating diffuse shade 
    //using normal to find how even the reflection is
    vec3 normFrag = normalize(vs_norm);
    //calulate light reflection
    vec3 lightDir = normalize(lightPosi - vs_pos);
    //combining those to a float
    float diff = max(dot(normFrag, lightDir), 0.0);
    //combining all those to find total diffuse shade
    vec3 diffuse = diff * lightColor;
    
    //calculating specular shade
    //how strong the light is
    float specularStrength = 2;
    //calculate the direction of the light
    vec3 viewDir = normalize(viewPosi - vs_pos);
    //calculating how the reflection gets directed
    vec3 reflectDir = reflect(-lightDir, normFrag);  
    //combining direction of light and reflection to a float
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32);
    //combining calculations to find total specular shade
    vec3 specular = specularStrength * spec * lightColor;  
    
    //outputting ambient shading
    //vec3 result = ambient * cubeColor;
    
    //outputting diffuse shading
    //vec3 result = diffuse * cubeColor;

    //outputting specular shading
    //vec3 result = specular * cubeColor;

    //outputting phong reflection
    vec3 result = (ambient + diffuse + specular) * cubeColor;

    //calculating and sending the final shade to vec4 to be displayed
    finalShade = vec4(result, 1.0);
} 