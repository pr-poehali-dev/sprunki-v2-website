import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  color: string;
  sounds: string[];
  type: 'normal' | 'horror';
}

const characters: Character[] = [
  { id: '1', name: 'Oren', color: 'bg-orange-500', sounds: ['Beat 1', 'Melody 1', 'Bass 1'], type: 'normal' },
  { id: '2', name: 'Clukr', color: 'bg-red-500', sounds: ['Beat 2', 'Melody 2', 'Voice 1'], type: 'normal' },
  { id: '3', name: 'Garnold', color: 'bg-gray-400', sounds: ['Beat 3', 'FX 1', 'Bass 2'], type: 'normal' },
  { id: '4', name: 'OWAKCX', color: 'bg-yellow-500', sounds: ['Beat 4', 'Melody 3', 'Voice 2'], type: 'normal' },
  { id: '5', name: 'Sky', color: 'bg-blue-400', sounds: ['Beat 5', 'FX 2', 'Harmony 1'], type: 'normal' },
  { id: '6', name: 'Mr. Sun', color: 'bg-yellow-400', sounds: ['Beat 6', 'Melody 4', 'Voice 3'], type: 'normal' },
  { id: '7', name: 'Durple', color: 'bg-purple-500', sounds: ['Beat 7', 'Bass 3', 'FX 3'], type: 'normal' },
  { id: '8', name: 'Mr. Tree', color: 'bg-green-500', sounds: ['Beat 8', 'Melody 5', 'Nature 1'], type: 'normal' },
  { id: '9', name: 'Simon', color: 'bg-cyan-400', sounds: ['Beat 9', 'Voice 4', 'Harmony 2'], type: 'normal' },
  { id: '10', name: 'Tunner', color: 'bg-gray-600', sounds: ['Beat 10', 'Bass 4', 'FX 4'], type: 'normal' },
  { id: '11', name: 'Mr. Fun Computer', color: 'bg-blue-600', sounds: ['Beat 11', 'Electronic 1', 'Voice 5'], type: 'normal' },
  { id: '12', name: 'Wenda', color: 'bg-pink-400', sounds: ['Beat 12', 'Melody 6', 'Cute 1'], type: 'normal' },
  { id: '13', name: 'Pinki', color: 'bg-pink-500', sounds: ['Beat 13', 'Voice 6', 'Happy 1'], type: 'normal' },
  { id: '14', name: 'Jevin', color: 'bg-teal-500', sounds: ['Beat 14', 'Bass 5', 'Cool 1'], type: 'normal' },
  { id: '15', name: 'Black', color: 'bg-gray-800', sounds: ['Dark Beat 1', 'Horror 1', 'Scary 1'], type: 'horror' },
  { id: '16', name: 'Brud', color: 'bg-green-800', sounds: ['Dark Beat 2', 'Horror 2', 'Scary 2'], type: 'horror' },
  { id: '17', name: 'Vineria', color: 'bg-purple-800', sounds: ['Dark Beat 3', 'Horror 3', 'Scary 3'], type: 'horror' },
  { id: '18', name: 'Gray', color: 'bg-gray-500', sounds: ['Dark Beat 4', 'Horror 4', 'Scary 4'], type: 'horror' },
  { id: '19', name: 'Raddy', color: 'bg-red-700', sounds: ['Dark Beat 5', 'Horror 5', 'Angry 1'], type: 'horror' },
];

export default function Index() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [activeSection, setActiveSection] = useState<'normal' | 'horror'>('normal');
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const filteredCharacters = characters.filter(char => char.type === activeSection);

  const playSound = (sound: string) => {
    setPlayingSound(sound);
    // Симуляция проигрывания звука
    setTimeout(() => setPlayingSound(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sprunki-cyan/20 to-sprunki-purple/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sprunki-orange to-sprunki-purple bg-clip-text text-transparent mb-4">
            SPRUNKI V2
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Создавай музыку с персонажами Sprunki
          </p>
          
          {/* Mode Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setActiveSection('normal')}
              variant={activeSection === 'normal' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Icon name="Smile" size={20} />
              Обычные персонажи
            </Button>
            <Button
              onClick={() => setActiveSection('horror')}
              variant={activeSection === 'horror' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Icon name="Ghost" size={20} />
              Хоррор персонажи
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character Gallery */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Users" size={24} />
              Галерея персонажей
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    selectedCharacter?.id === character.id ? 'ring-4 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCharacter(character)}
                >
                  <CardContent className="p-4">
                    <div className={`w-full h-24 rounded-lg ${character.color} mb-3 flex items-center justify-center shadow-lg`}>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon 
                          name={character.type === 'horror' ? 'Skull' : 'Music'} 
                          size={24} 
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-center text-sm">{character.name}</h3>
                    <Badge variant="secondary" className="w-full justify-center mt-2 text-xs">
                      {character.sounds.length} звуков
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sound Collection */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Volume2" size={24} />
              Коллекция звуков
            </h2>

            {selectedCharacter ? (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 rounded-full ${selectedCharacter.color} mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                      <Icon 
                        name={selectedCharacter.type === 'horror' ? 'Skull' : 'Music'} 
                        size={32} 
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-xl font-bold">{selectedCharacter.name}</h3>
                    <Badge variant={selectedCharacter.type === 'horror' ? 'destructive' : 'default'}>
                      {selectedCharacter.type === 'horror' ? 'Хоррор' : 'Обычный'}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {selectedCharacter.sounds.map((sound, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full flex items-center justify-between group hover:bg-primary hover:text-primary-foreground"
                        onClick={() => playSound(sound)}
                      >
                        <span>{sound}</span>
                        <Icon 
                          name={playingSound === sound ? 'Square' : 'Play'} 
                          size={16}
                          className={playingSound === sound ? 'animate-pulse' : ''}
                        />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="MousePointer" size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">
                    Выберите персонажа, чтобы послушать его звуки
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Beat Maker Preview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Icon name="Music" size={20} />
                  Бит-мейкер
                </h3>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((beat) => (
                      <div key={beat} className="w-8 h-8 bg-gradient-to-r from-sprunki-orange to-sprunki-pink rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant="secondary">
                    <Icon name="Play" size={16} className="mr-2" />
                    Создать трек
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}