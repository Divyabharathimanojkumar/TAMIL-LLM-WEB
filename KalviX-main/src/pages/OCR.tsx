
import React, { useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Download, Scan } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const OCR: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [outputFormat, setOutputFormat] = useState<string>('txt');
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload JPG, PNG, or PDF files only.",
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const processFile = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      const mockTamilText = `இது ஒரு மாதிரி தமிழ் உரை ஆகும். OCR கருவி மூலம் இந்த உரை பிரித்தெடுக்கப்பட்டுள்ளது.

கல்விX என்பது தமிழ்நாட்டு மாணவர்களுக்கான ஒரு சிறந்த கற்றல் தளமாகும். இது பின்வரும் சேவைகளை வழங்குகிறது:

1. கல்வி போட் - 10, 11, 12ம் வகுப்பு மாணவர்களுக்கான தமிழ் பாட உதவி
2. OCR கருவி - தமிழ் மொழி உரை பிரித்தெடுத்தல்

நன்றி!`;
      
      setExtractedText(mockTamilText);
      setIsProcessing(false);
      
      toast({
        title: "Text extracted successfully!",
        description: `Processed ${pageCount} page(s) from ${file.name}`,
      });
    }, 2000);
  };

  const downloadFile = () => {
    if (!extractedText) {
      toast({
        title: "No text to download",
        description: "Please extract text first.",
        variant: "destructive",
      });
      return;
    }

    let content = extractedText;
    let filename = `extracted_text.${outputFormat}`;
    let mimeType = 'text/plain';

    if (outputFormat === 'json') {
      content = JSON.stringify({ text: extractedText, pages: pageCount }, null, 2);
      mimeType = 'application/json';
    } else if (outputFormat === 'pdf') {
      // For PDF, we'll just download as text for now
      toast({
        title: "PDF export coming soon!",
        description: "Downloading as text file for now.",
      });
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-500">Tamil OCR Tool</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Extract Tamil text from images and PDFs with high precision
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload File</span>
              </CardTitle>
              <CardDescription>
                Supported formats: JPG, PNG, JPEG, PDF (Max 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : isDarkMode
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className={`h-12 w-12 mx-auto mb-4 ${
                  dragActive ? 'text-blue-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Drag and drop your file here, or
                </p>
                <label className="cursor-pointer">
                  <span className="text-blue-500 hover:text-blue-600 underline">
                    browse files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Selected: {file.name}
                  </p>
                )}
              </div>

              {/* Page Count Input */}
              <div className="space-y-2">
                <Label htmlFor="pageCount">Number of Pages to Extract</Label>
                <Input
                  id="pageCount"
                  type="number"
                  min="1"
                  max="100"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}
                  placeholder="Enter number of pages"
                />
              </div>

              {/* Output Format Selection */}
              <div className="space-y-2">
                <Label htmlFor="outputFormat">Output Format</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <SelectItem value="txt">Text (.txt)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Process Button */}
              <Button
                onClick={processFile}
                disabled={!file || isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Scan className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Scan className="h-4 w-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Extracted Text</span>
              </CardTitle>
              <CardDescription>
                Review and download your extracted Tamil text
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Extracted text will appear here..."
                className={`min-h-[300px] font-mono ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : ''
                }`}
                style={{ fontSize: '14px', lineHeight: '1.5' }}
              />
              
              {extractedText && (
                <div className="flex space-x-4">
                  <Button
                    onClick={downloadFile}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download as {outputFormat.toUpperCase()}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className={isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className={`list-decimal list-inside space-y-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <li>Upload your file by dragging and dropping or clicking browse</li>
              <li>Specify the number of pages you want to extract (for PDFs)</li>
              <li>Choose your preferred output format (TXT, JSON, or PDF)</li>
              <li>Click "Extract Text" to process your file</li>
              <li>Review the extracted text and make any necessary edits</li>
              <li>Download the processed text in your chosen format</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OCR;
