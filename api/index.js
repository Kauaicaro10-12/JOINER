const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/join', (req, res) => {
  const { placeId, jobId } = req.body;

  if (!placeId) {
    return res.status(400).json({ error: 'placeId is required' });
  }

  const joinScript = `
    local TeleportService = game:GetService("TeleportService")
    local Players = game:GetService("Players")
    local LocalPlayer = Players.LocalPlayer

    local function teleport()
      local success, result = pcall(function()
        TeleportService:TeleportToPlaceInstance(${placeId}, "${jobId || ''}", LocalPlayer)
      end)

      if not success then {
        warn("Teleport failed:", result)
      end
    end

    teleport()
  `;

  res.json({ script: joinScript });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
