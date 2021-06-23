// function shape_dimensions(shape) {
//   switch (shape.name) {
//     case 'circle':
//       let cirlce_temp = 2 * Math.PI.shape.radius;
//       const circle_result = {};
//       circle_result.circumference = cirlce_temp;
//       cirlce_temp = Math.PI * shape.radius ** 2;
//       circle_result.area = cirlce_temp;
//       return circle_result;
//     case 'square':
//       const square_result = {};
//       let side_A = shape.side_A;
//       let side_B = shape.side_B;
//       square_result.area = side_A * side_B;
//       square_result.perimeter = 2 * side_A + 2 * side_B;
//       return square_result;
//     case 'rectangle':
//       const rectangle_result = {};
//       let side_A = shape.side_A;
//       let side_B = shape.side_B;
//       rectangle_result.area = side_A * side_B;
//       rectangle_result.perimeter = 2 * side_A + 2 * side_B;
//       return rectangle_result;
//   }
// }

function shape_dimensions(shape) {
  switch (shape.name) {
    case 'circle':
      return {
        circumference: 2 * Math.PI.shape.radius,
        area: Math.PI * shape.radius ** 2,
      };

    case 'square':
    case 'area':
      return {
        area: shape.side_A * shape.side_B,
        perimeter: 2 * shape.side_A + 2 * shape.side_B,
      };

    default:
      throw new Error('name is invalid');
  }
}
