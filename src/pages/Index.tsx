import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  color: string;
  soundType: string;
  type: 'normal' | 'horror';
  animation: string;
}

interface ActiveSlot {
  id: string;
  character: Character | null;
  isPlaying: boolean;
}

const characters: Character[] = [
  { id: '1', name: 'Oren', color: 'bg-orange-500', soundType: 'beat', type: 'normal', animation: 'bounce' },
  { id: '2', name: 'Clukr', color: 'bg-red-500', soundType: 'melody', type: 'normal', animation: 'pulse' },
  { id: '3', name: 'Garnold', color: 'bg-gray-400', soundType: 'bass', type: 'normal', animation: 'spin' },
  { id: '4', name: 'OWAKCX', color: 'bg-yellow-500', soundType: 'voice', type: 'normal', animation: 'shake' },
  { id: '5', name: 'Sky', color: 'bg-blue-400', soundType: 'harmony', type: 'normal', animation: 'float' },
  { id: '6', name: 'Mr. Sun', color: 'bg-yellow-400', soundType: 'synth', type: 'normal', animation: 'glow' },
  { id: '7', name: 'Durple', color: 'bg-purple-500', soundType: 'effect', type: 'normal', animation: 'wobble' },
  { id: '8', name: 'Mr. Tree', color: 'bg-green-500', soundType: 'nature', type: 'normal', animation: 'sway' },
  { id: '9', name: 'Simon', color: 'bg-cyan-400', soundType: 'vocal', type: 'normal', animation: 'breathe' },
  { id: '10', name: 'Tunner', color: 'bg-gray-600', soundType: 'percussion', type: 'normal', animation: 'tap' },
  { id: '11', name: 'Black', color: 'bg-gray-800', soundType: 'dark-beat', type: 'horror', animation: 'flicker' },
  { id: '12', name: 'Brud', color: 'bg-green-800', soundType: 'horror-voice', type: 'horror', animation: 'glitch' },
  { id: '13', name: 'Vineria', color: 'bg-purple-800', soundType: 'screech', type: 'horror', animation: 'distort' },
  { id: '14', name: 'Gray', color: 'bg-gray-500', soundType: 'static', type: 'horror', animation: 'static' },
];

export default function Index() {
  const [activeSlots, setActiveSlots] = useState<ActiveSlot[]>(() => 
    Array(7).fill(null).map((_, index) => ({
      id: `slot-${index}`,
      character: null,
      isPlaying: false
    }))
  );
  
  const [draggedCharacter, setDraggedCharacter] = useState<Character | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentMode, setCurrentMode] = useState<'normal' | 'horror'>('normal');
  const [globalVolume, setGlobalVolume] = useState(75);

  const filteredCharacters = characters.filter(char => char.type === currentMode);

  const handleDragStart = (character: Character) => {
    setDraggedCharacter(character);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (draggedCharacter) {
      setActiveSlots(prev => 
        prev.map(slot => 
          slot.id === slotId 
            ? { ...slot, character: draggedCharacter, isPlaying: true }
            : slot
        )
      );
      setDraggedCharacter(null);
    }
  };

  const removeFromSlot = (slotId: string) => {
    setActiveSlots(prev =>
      prev.map(slot =>
        slot.id === slotId
          ? { ...slot, character: null, isPlaying: false }
          : slot
      )
    );
  };

  const toggleSlot = (slotId: string) => {
    setActiveSlots(prev =>
      prev.map(slot =>
        slot.id === slotId
          ? { ...slot, isPlaying: !slot.isPlaying }
          : slot
      )
    );
  };

  const clearAll = () => {
    setActiveSlots(prev =>
      prev.map(slot => ({ ...slot, character: null, isPlaying: false }))
    );
  };

  const getAnimationClass = (animation: string, isPlaying: boolean) => {
    if (!isPlaying) return '';
    
    const animations = {
      bounce: 'animate-bounce',
      pulse: 'animate-pulse',
      spin: 'animate-spin',
      shake: 'animate-pulse',
      float: 'animate-bounce',
      glow: 'animate-pulse',
      wobble: 'animate-bounce',
      sway: 'animate-pulse',
      breathe: 'animate-pulse',
      tap: 'animate-bounce',
      flicker: 'animate-pulse',
      glitch: 'animate-bounce',
      distort: 'animate-pulse',
      static: 'animate-bounce'
    };
    
    return animations[animation as keyof typeof animations] || 'animate-pulse';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      currentMode === 'horror' 
        ? 'bg-gradient-to-br from-gray-900 via-red-900/20 to-black' 
        : 'bg-gradient-to-br from-sprunki-cyan/20 to-sprunki-purple/20'
    }`}>
      <div className="container mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl font-bold mb-4 transition-colors ${
            currentMode === 'horror' 
              ? 'text-red-400' 
              : 'bg-gradient-to-r from-sprunki-orange to-sprunki-purple bg-clip-text text-transparent'
          }`}>
            SPRUNKI BEATS
          </h1>
          
          {/* Mode Switch */}
          <div className="flex justify-center gap-4 mb-6">
            <Button
              onClick={() => setCurrentMode('normal')}
              variant={currentMode === 'normal' ? 'default' : 'outline'}
              className="flex items-center gap-2"
            >
              <Icon name="Music" size={20} />
              Нормальный
            </Button>
            <Button
              onClick={() => setCurrentMode('horror')}
              variant={currentMode === 'horror' ? 'destructive' : 'outline'}
              className="flex items-center gap-2"
            >
              <Icon name="Skull" size={20} />
              Хоррор
            </Button>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-6">
            <Button onClick={clearAll} variant="outline" className="flex items-center gap-2">
              <Icon name="RotateCcw" size={16} />
              Очистить
            </Button>
            <Button
              onClick={() => setIsRecording(!isRecording)}
              variant={isRecording ? 'destructive' : 'default'}
              className="flex items-center gap-2"
            >
              <Icon name={isRecording ? 'Square' : 'Circle'} size={16} />
              {isRecording ? 'Стоп' : 'Запись'}
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Volume2" size={16} />
              <input
                type="range"
                min="0"
                max="100"
                value={globalVolume}
                onChange={(e) => setGlobalVolume(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        </div>

        {/* Main Stage */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Active Mix Slots */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Music" size={24} />
              Микшер
            </h2>
            
            <div className="grid grid-cols-7 gap-3 mb-6">
              {activeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                    slot.character 
                      ? `${slot.character.color} border-transparent shadow-lg` 
                      : currentMode === 'horror'
                        ? 'border-red-600/50 bg-gray-800/50 hover:bg-red-900/20'
                        : 'border-primary/30 bg-white/50 hover:bg-primary/10'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, slot.id)}
                >
                  {slot.character ? (
                    <div className="text-center relative group">
                      <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 ${
                        slot.isPlaying ? getAnimationClass(slot.character.animation, true) : ''
                      }`}>
                        <Icon 
                          name={slot.character.type === 'horror' ? 'Skull' : 'Music'} 
                          size={20} 
                          className="text-white" 
                        />
                      </div>
                      <p className="text-xs text-white font-medium">{slot.character.name}</p>
                      <p className="text-xs text-white/70">{slot.character.soundType}</p>
                      
                      {/* Slot Controls */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          size="sm"
                          variant={slot.isPlaying ? 'default' : 'secondary'}
                          className="w-6 h-6 p-0"
                          onClick={() => toggleSlot(slot.id)}
                        >
                          <Icon name={slot.isPlaying ? 'Pause' : 'Play'} size={12} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="w-6 h-6 p-0"
                          onClick={() => removeFromSlot(slot.id)}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                      
                      {/* Playing Indicator */}
                      {slot.isPlaying && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="flex gap-1">
                            {[1,2,3].map(i => (
                              <div 
                                key={i} 
                                className="w-1 h-3 bg-white/80 rounded animate-pulse" 
                                style={{ animationDelay: `${i * 0.1}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Icon name="Plus" size={24} className="text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500">Перетащите сюда</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Visualizer */}
            <Card className="bg-black/20 border-none">
              <CardContent className="p-6">
                <div className="flex justify-center items-end gap-1 h-32">
                  {Array(20).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 rounded-t transition-all duration-150 ${
                        currentMode === 'horror' ? 'bg-red-500' : 'bg-gradient-to-t from-sprunki-orange to-sprunki-purple'
                      }`}
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Palette */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Users" size={24} />
              Персонажи
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {filteredCharacters.map((character) => (
                <Card
                  key={character.id}
                  draggable
                  onDragStart={() => handleDragStart(character)}
                  className="cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                >
                  <CardContent className="p-3">
                    <div className={`w-full h-16 rounded-lg ${character.color} mb-2 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon 
                          name={character.type === 'horror' ? 'Skull' : 'Music'} 
                          size={16} 
                          className="text-white"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-center text-xs">{character.name}</h3>
                    <Badge variant="secondary" className="w-full justify-center mt-1 text-xs">
                      {character.soundType}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recording Status */}
            {isRecording && (
              <Card className="mt-4 border-red-500 bg-red-500/10">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-500 font-bold">ЗАПИСЬ</span>
                  </div>
                  <p className="text-sm text-gray-600">Создаётся трек...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}