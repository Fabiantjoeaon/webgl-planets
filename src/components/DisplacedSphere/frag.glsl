uniform sampler2D uNoiseTexture;
uniform vec2 uNoiseTextureResolution;
uniform float uTime;
uniform vec3 uDarkestColor;
uniform vec3 uMidColor;
uniform vec3 uLightestColor;
uniform vec3 uDiffuse;
uniform vec3 Ka;
uniform vec3 Kd;
uniform vec3 Ks;

uniform vec3 LightIntensity;
uniform float Shininess;
uniform vec3 diffuse;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;




struct PointLight {
  vec3 position;
  vec3 color;
};
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

			#include <fog_pars_fragment>

void main() {
  
  float animateXOffset = 0.3;
  vec2 offset = vec2(0.5, 0.5);
  float toWhiteOffset = 0.15;
  vec2 scaleVector = vec2(0.5, 0.5);
  vec4 noiseTexture = texture2D(uNoiseTexture, vUv);
  
  // Scaled
  vec2 scaledUv = vUv * scaleVector;
  scaledUv.x = scaledUv.x - uTime * 0.1 + 0.5;
  scaledUv.y = scaledUv.y + uTime * 0.1;
  vec4 noiseTextureScaled = texture2D(uNoiseTexture, scaledUv);

  // Reversed scaled
  vec2 reversedScaledUv = vUv * scaleVector;
  reversedScaledUv.x = reversedScaledUv.x + uTime * 0.1;
  reversedScaledUv.y = reversedScaledUv.y - uTime * 0.1;
  vec4 noiseTextureReverseScaled = texture2D(uNoiseTexture, reversedScaledUv);

  // Combine scaled
  vec4 combinedScaledTextures = mix(noiseTextureScaled, noiseTextureReverseScaled, 0.5);

  // Add to original noise
  vec4 combinedScaledTexturesAndOriginalNoise = mix(combinedScaledTextures, noiseTexture, 0.5);

  // Plug into original uv offset
  vec2 pluggedInUv = 
    vec2(
      vUv.x + combinedScaledTexturesAndOriginalNoise.r, 
      vUv.y + combinedScaledTexturesAndOriginalNoise.r
    );
  vec4 pluggedInTexture = texture2D(uNoiseTexture, pluggedInUv);
    
  // Adjust contrast
  vec4 finalTexture = pluggedInTexture * combinedScaledTexturesAndOriginalNoise;
  if(finalTexture.r < toWhiteOffset) {
    float white = 1.0;
    finalTexture.r = white;
    finalTexture.g = white;
    finalTexture.b = white;
  }
  
  if(finalTexture.r > 0.7) {
    finalTexture.rgb = finalTexture.rgb * uLightestColor;
  }
  else if(finalTexture.r > 0.3) { 
    finalTexture.rgb = finalTexture.rgb * uMidColor;
  }
  else {
    finalTexture.rgb = finalTexture.rgb * uDarkestColor;
  }

  vec4 finalColor = finalTexture;
  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
  
  vec3 adjustedLight = pointLights[l].position + cameraPosition;
    vec3 n = normalize(vNormal);
    vec3 s = normalize(adjustedLight - vPos);
    vec3 v = normalize(vec3(-vPos));
    vec3 r = reflect(-s, n);

    vec3 ambient = Ka;
    vec3 diffuse = Kd * max(dot(s * 0.5, n), 0.0);
    // vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);
    finalColor.rgb += LightIntensity * (diffuse);
  }
  
  // gl_FragColor = mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), finalColor, finalColor);
  gl_FragColor = finalColor;
  #include <fog_fragment>
}