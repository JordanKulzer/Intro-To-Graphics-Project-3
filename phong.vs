//used powerpoint on blackboard and https://github.com/Headturna/OpenGL-C---Tutorials/blob/master/vertex_core.glsl to help format
//declare GLSL version 3.3
#version 330 core

//declaring vertex attributes
layout (location = 0) in vec3 pos;
layout (location = 1) in vec3 norm;

//declaring uniforms
uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

//output
out vec3 vs_pos;
out vec3 vs_norm;

void main()
{
    //setting vertex shader position and normal
    vs_pos = vec3(model * vec4(pos, 1.0));
    vs_norm = mat3(transpose(inverse(model))) * norm;  

    //transformed position
    gl_Position = proj * view * vec4(vs_pos, 1.0);
}