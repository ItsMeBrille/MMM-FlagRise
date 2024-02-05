# MMM-FlagRise

**MMM-FlagRise** is a MagicMirror2 module that displays a flag based on specific rules for flag raising and lowering. The module fetches sunrise and sunset times for a given city using an external API and shows the flag image during daytime based on predefined regulations. Change the flag image in the module folder to fit your nationality.

## Installation

1. Clone this repository into the `modules` directory of your MagicMirror2 installation:
   ```shell
   git clone https://github.com/ItsMeBrille/MMM-FlagRise.git
   ```

2. Configure the module by adding it to your `config/config.js` file:
   ```javascript
   {
     module: "MMM-FlagRise",
     position: "top_right",
     config: {
       city: "Oslo", // Your location
     }
   }
   ```

3. (Optional) Customize the appearance by modifying the `MMM-FlagRise.css` file.

4. Start your MagicMirror2 application.

## Configuration

- `city`: The city for which to fetch sunrise and sunset times.

## License

MIT License. See [LICENSE](LICENSE) for details.
